const { Workbook } = require('exceljs');

module.exports = class Excel {
    constructor() {
        this.workbook = new Workbook();
    }

    readFile(path) {
        return this.workbook.xlsx.readFile(path);
    }
}
