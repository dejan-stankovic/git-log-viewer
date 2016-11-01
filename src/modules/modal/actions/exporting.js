import Common from 'utils/common.js';

export default class ExportingAction {
	static startExporting() {
		return Common.getAction('EXPORTING_START');
	}

	static updateExporting(progress, current, log) {
		return Common.getAction('EXPORTING_UPDATE', { progress, current, log });
	}

	static addLog(log) {
		return Common.getAction('EXPORTING_ADD_LOG', log);
	}
}