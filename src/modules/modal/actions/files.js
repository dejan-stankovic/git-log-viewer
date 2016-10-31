import Common from 'utils/common.js';

export default class FilesAction {
	static updateFiles(files) {
		return Common.getAction('FILES_UPDATE', files);
	}

	static setProgress(progress) {
		return Common.getAction('FILES_SET_PROGRESS', progress);
	}
}