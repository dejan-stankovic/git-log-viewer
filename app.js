const { BrowserWindow, app, ipcMain, dialog } = require('electron');
const Report = require('./src/utils/report.js');
const AppConst = require('./src/constants/app.js')

let mainWindow;

function onClosed() {
    mainWindow = null;
}

function createMainWindow() {
    const win = new BrowserWindow({
        width: 1024,
        height: 768,
        title: "Git Log Viewer"
    });
    win.loadURL(`file://${__dirname}/src/views/index.html`);
    win.setMenu(null);
    win.webContents.openDevTools();
    win.on('closed', onClosed);
    return win;
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (!mainWindow) {
        mainWindow = createMainWindow();
    }
});

app.on('ready', () => {
    mainWindow = createMainWindow();
});

ipcMain.on(AppConst.CHANNEL_SHOW_DIR_DIALOG, (event, channelName) => {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, (files) => {
        if (files) event.sender.send(channelName, files);
    });
});

ipcMain.on(AppConst.CHANNEL_SHOW_ERR_BOX, (event, title, content) => {
    dialog.showErrorBox(title, content);
});

ipcMain.on(AppConst.CHANNEL_COMMITS_REPORT, (event, commits) => {
    dialog.showSaveDialog({
        filters: [{ name: 'Excel Document', extensions: ['xlsx'] }]
    }, (file) => {
        Report.exportCommitsReport(commits, file)
            .then(() => {
                dialog.showMessageBox(mainWindow, {
                    type: 'info',
                    title: 'Done',
                    buttons: ['OK'],
                    message: 'Report has been successfully created',
                    detail: 'Path: ' + file
                });
            })
            .catch(err => {
                console.error(err);
                dialog.showErrorBox('Error', 'Could not create report');
            });
    });
});

ipcMain.on(AppConst.CHANNEL_MERGE_DIFF_REPORT, (event, data) => {
    let child = new BrowserWindow({
        parent: mainWindow,
        modal: true,
        show: true,
        frame: false,
        resizable: false,
        width: 640,
        height: 480
    });
    child.webContents.openDevTools();
    child.data = data;
    child.loadURL(`file://${__dirname}/src/views/modal.html`);
});
