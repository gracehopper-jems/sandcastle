import React from 'react';

let editorManifesto = ['html', 'css', 'js', 'server', 'db'];

const Editors = editorManifesto.map(editor => {
	return () => {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-12">
						<div id={`${editor}-firepad-container`}></div>
					</div>
				</div>
			</div>
		);
	};
});

export default Editors;



