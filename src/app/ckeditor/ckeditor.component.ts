import { Component, ChangeDetectionStrategy } from '@angular/core';

import { DecoupledEditor, Essentials, Italic, Paragraph, Bold, Undo } from 'ckeditor5';


@Component({
	selector: 'app-ckeditor-delta',
	templateUrl: './ckeditor.component.html',
	styleUrls: ['./ckeditor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CkeditorComponent {
	ckEditorCssFileLocation = 'ck-editor.style.css';
	editorInstance: any;
	editorConfig = {
		plugins: [ Bold, Essentials, Italic, Paragraph, Undo ],
        toolbar: [ 'undo', 'redo', '|', 'bold', 'italic' ]
	}
	ngAfterViewInit(): void {
		this.loadStyles();
		this.loadCKEditor();
	}

	loadStyles() {
		const ckEditorStyle = this.generateStyle(this.ckEditorCssFileLocation);
		document.head.appendChild(ckEditorStyle);
	}

	generateStyle(url: string): HTMLLinkElement {
		const link: HTMLLinkElement = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('type', 'text/css');
		link.setAttribute('href', url);

		return link;
	}

	loadCKEditor(): void {
		const editorContainer: any = document.querySelector('#editor');
			DecoupledEditor
			.create(editorContainer, this.editorConfig)
			.then((editor: any) => {
				this.initializeCKEditor(editor);
			})
			.catch((err: any) => {
				console.error(err.stack);
			});
	}

	initializeCKEditor(editor: any): void {
		this.editorInstance = editor;

		const toolbarContainer = document.querySelector('#toolbar-container');
		if (toolbarContainer) {
			toolbarContainer.appendChild(editor.ui.view.toolbar.element);
		}

		const availablePlugins = editor.plugins;

		console.log('Available Plugins:', availablePlugins);

		this.editorInstance.model.document.on('change:data', () => {
			const data = this.editorInstance.getData();
			console.log('Content has changed:', data);
		});
	}
	getEditorContent(): void {
		if (this.editorInstance) {
			const content = this.editorInstance.getData();
			console.log('Current content:', content);
		}
	}

	setEditorContent(content: string): void {
		if (this.editorInstance) {
			this.editorInstance.setData(content);
		}
	}
}
