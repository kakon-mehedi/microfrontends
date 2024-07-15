import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { EditorConfig, Editor } from '@ckeditor/ckeditor5-core';

@Component({
	selector: 'app-ckeditor',
	templateUrl: './ckeditor.component.html',
	styleUrls: ['./ckeditor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CkeditorComponent implements OnInit, OnChanges {
	@Input() data!: string;
	@Output() dataChange = new EventEmitter<string>();

	public Editor: any = DecoupledEditor;

	public config: EditorConfig = {
		toolbar: [
			'undo',
			'redo',
			'heading',
			'|',
			'fontSize',
			'fontFamily',
			'|',
			'fontColor',
			'fontBackgroundColor',
			'highlight',
			'|',
			'bold',
			'italic',
			'underline',
			'strikethrough',
			'superscript',
			'subscript',
			'removeFormat',
			'findAndReplace',
			'|',
			'alignment',
			'|',
			'numberedList',
			'bulletedList',
			'todoList',
			'|',
			'outdent',
			'indent',
			'|',
			'imageUpload',
			'insertTable',
			'mediaEmbed',
			'|',
			'horizontalLine',
			'link',
			'blockQuote',
			'code',
			'codeBlock',
			'htmlEmbed',
			'pageBreak',
			'specialCharacters',
		],
		plugins: (DecoupledEditor as any).builtinPlugins,
		licenseKey: '<YOUR_LICENSE_KEY>',
		mention: {
			feeds: [
				{
					marker: '@',
					feed: ['@angular', '@ckeditor', '@typescript'],
					minimumCharacters: 1,
				},
			],
		},
	};

	private editorInstance: Editor | null = null;

	constructor(private cdr: ChangeDetectorRef) {}

	ngOnInit(): void {}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes['data'] && this.editorInstance) {
			this.editorInstance.setData(this.data);
		}
	}

	public onChange({ editor }: { editor: Editor }) {
		const data = editor.getData();
		this.dataChange.emit(data);
		console.log(data);
	}

	public onReady(editor: Editor) {
		this.editorInstance = editor;
		editor.focus();
		if (this.data) {
			editor.setData(this.data);
		}
		// Attach the toolbar to the container.
		const toolbarContainer = document.querySelector('#toolbar-container');
		if (toolbarContainer) {
			const editorView = editor.ui.view as any; // Use `any` to bypass the type check
			if (editorView.toolbar && editorView.toolbar.element) {
				toolbarContainer.appendChild(editorView.toolbar.element);
			}
		}
	}
}
