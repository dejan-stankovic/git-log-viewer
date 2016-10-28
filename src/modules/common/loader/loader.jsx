import React from 'react';

export default (props) => {
	let {className, isFullscreen } = props;
	if (!isFullscreen) {
		return (
			<div className={'ui active centered text inline loader ' + className}>
				{props.text}
			</div>
		)
	}
	
	return (
		<div id="modal-loader" className="ui segment glv-loader-full">
            <div className={'ui active dimmer ' + className}>
                <div className="ui medium text loader">{props.text}</div>
            </div>
        </div>
	);
}