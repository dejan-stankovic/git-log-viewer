const path = require('path');
const fse = require('fs-extra');
const { Workbook } = require('exceljs');
const { Diff2Html } = require('diff2html');

const TEMPLATE_PATH = path.resolve(require.main.filename, '../templates');
const TEMPLATE_HTML_INDEX = path.resolve(TEMPLATE_PATH, 'htmldiff/template.html');
const TEMPLATE_HTML_ASSETS = path.resolve(TEMPLATE_PATH, 'htmldiff/assets');

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

    static exportDiffHTML(diff, file, output, isSideBySide, isCopyAsset) {
    	return new Promise((resolve, reject) => {
            try {
                if (isCopyAsset) {
                    let outputPath = path.resolve(output, 'htmldiff/assets');
                    fse.copySync(TEMPLATE_HTML_ASSETS, outputPath);
                }
            } catch (err) {
                reject(err);
            }

            if (diff.trim().length === '0') resolve('');
            let config = {};
            if (isSideBySide) config.outputFormat = 'side-by-side';
            let htmlDiff = Diff2Html.getPrettyHtml(diff, config);
            this.getCompletedHTML(htmlDiff)
                .then(content => {
                    let current = new Date().getTime();
                    let outputName = `${path.basename(file)}-${current}.html`;
                    let outputPath = path.resolve(output, 'htmldiff', outputName);
                    fse.writeFile(outputPath, content, err => {
                        if (err) reject(err);
                        resolve(outputName);
                    });
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    static getCompletedHTML(htmlDiff) {
        return new Promise((resolve, reject) => {
            fse.readFile(TEMPLATE_HTML_INDEX, (err, data) => {
                if (err) reject(err);
                let output = data.toString();
                output = output.replace('<!--diff2html-diff-->', htmlDiff);
                resolve(output);
            });
        });
    }

    static exportDiffReport(project, files, htmls, output) {
        return new Promise((resolve, reject) => {
            let wb = new Workbook();
            let outputFile = path.resolve(output, 'DiffSummany.xlsx');
            wb.xlsx.readFile(path.resolve(TEMPLATE_PATH, 'diff.xlsx'))
                .then(() => {
                    let sheet = wb.getWorksheet(1);
                    
                    for (let i = 0; i < files.length; i++) {
                        let html = htmls[i];
                        let row = sheet.getRow(i + 2);
                        row.getCell('A').value = i + 1;
                        row.getCell('B').value = project;
                        row.getCell('C').value = files[i].filePath;
                        row.getCell('D').value = html === '' ? '' : 'YES';
                        row.getCell('E').value = html;
                    }
                    return wb.xlsx.writeFile(outputFile);
                })
                .then(() => resolve(outputFile))
                .catch(err => reject(err));
        });
    }
}
