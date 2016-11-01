import React from 'react';
import { connect } from 'react-redux';
import { remote, ipcRenderer } from 'electron';
import AppConst from 'constants/app.js';
import Common from 'utils/common.js';
import Git from 'utils/git.js';
import { ExportingAction, ReadyAction } from 'modules/modal/actions';
import ModalMain from 'modules/modal/components/modal-main.jsx';
import ModalButtons from 'modules/modal/components/modal-buttons.jsx';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.outputNames = [];
        this.closeModal = this.closeModal.bind(this);
        this.process = this.process.bind(this);
        this.exportDiff = this.exportDiff.bind(this);
    }

    render() {
        let { ready, exporting } = this.props;
        let label = "Let's do it";
        if (exporting.status) {
        	if (exporting.progress !== 100) label = 'Exporting...';
        	else label = 'Done';
        }
        return (
            <div id="modal" className="glv-modal">
				<ModalMain/>
				<ModalButtons
					cancel={this.closeModal}
					disabled={!ready}
					process={this.process}
					label={label}/>
			</div>
        )
    }

    closeModal() {
        remote.getCurrentWindow().destroy();
    }

    process() {
        let { ready, exporting } = this.props;
        if (exporting.progress === 100 && ready)
            this.closeModal();
        this.props.startExporting();
        this.props.setReady(false);
        this.exportDiff(null, 0);
    }

    exportDiff(event, index, outputName) {
        if (typeof outputName !== 'undefined') this.outputNames.push(outputName);
        let { data, files, target, diffType, output, exporting, setReady, updateExporting } = this.props;
        if (index >= files.data.length) {
            ipcRenderer.send(AppConst.CHANNEL_EXPORT_DIFF_REPORT, data.project, files.data, this.outputNames, output);
            updateExporting(100, 'Done');
            setReady(true);
            return;
        }
        let file = files.data[index].filePath;
        let progress = Math.ceil(index / files.data.length * 100);
        let log = exporting.log + `[${Common.getCurrentTime()}] Export diff for ${file}\r\n`;
        let isSideBySide = diffType[0].value === 2;
        updateExporting(progress, file, log);
        Git.diff(file, data.currentBranch, target[0])
            .then(diff => {
                ipcRenderer.send(AppConst.CHANNEL_EXPORT_HTML_DIFF, diff, file, output, isSideBySide, index);
                ipcRenderer.once(AppConst.CHANNEL_EXPORT_HTML_DIFF_DONE, this.exportDiff);
            })
            .catch(err => {
                throw err;
            });
    }
}

const mapStateToProps = state => {
    return {
        data: state.data,
        files: state.files,
        target: state.target,
        diffType: state.diffType,
        output: state.output,
        ready: state.ready,
        exporting: state.exporting
    };
}
const mapDispatchToProps = dispatch => {
    return {
        startExporting: () => dispatch(ExportingAction.startExporting()),
        setReady: ready => dispatch(ReadyAction.setReady(ready)),
        updateExporting: (progress, current, log) => dispatch(ExportingAction.updateExporting(progress, current, log))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Modal);
