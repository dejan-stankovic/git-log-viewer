const path = require('path');
const { Workbook } = require('exceljs');

const TEMPLATE_PATH = path.resolve(require.main.filename, '../templates');

module.exports = class Report {

    static exportCommitsReport(commits, file) {
        return new Promise((resolve, reject) => {
            let wb = new Workbook();
            wb.xlsx.readFile(path.resolve(TEMPLATE_PATH, 'commits.xlsx'))
                .then(() => {
                    let sheet = wb.getWorksheet(1);
                    for (let i = 0; i < commits.length; i++) {
                        let commit = commits[i];
                        let row = sheet.getRow(i + 2);
                        row.getCell('A').value = i + 1;
                        row.getCell('B').value = commit.date;
                        row.getCell('C').value = commit.username;
                        row.getCell('D').value = commit.email;
                        row.getCell('E').value = commit.message;
                        row.getCell('F').value = commit.hash;
                    }
                    return wb.xlsx.writeFile(file);
                })
                .then(() => resolve())
                .catch(err => reject(err));
        });
    }

    static exportMergeDiffReport(commits, file) {
    	
    }
}
