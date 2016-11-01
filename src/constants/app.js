module.exports = Object.freeze({
    HTML_APP_ID: 'app',
    CHANNEL_SHOW_DIR_DIALOG: 'show-dir-dialog',
    CHANNEL_SELECTED_DIR: 'selected-dir',
    CHANNEL_SHOW_ERR_BOX: 'show-err-box',
    CHANNEL_SHOW_MODAL: 'show-modal',
    CHANNEL_COMMITS_REPORT: 'export-commits-report',

    CHANNEL_EXPORT_HTML_DIFF: 'export-html-diff',
    CHANNEL_EXPORT_HTML_DIFF_DONE: 'export-html-diff-done',

    CHANNEL_EXPORT_DIFF_REPORT: 'export-diff-report',

    PAGER_SIZE_AVAIABLE: [50, 100, 150, 200, 300, 500],
    PAGER_DEFAULT_SIZE: 50,
    EXEC_OPTIONS: { maxBuffer: 1000 * 1024 },

    DIFF_TYPES: [
        { value: 1, text: 'Line by line' },
        { value: 2, text: 'Side by side' }
    ]
});
