import {
	Component,
	ChangeDetectionStrategy,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

import {
	DecoupledEditor,
	Alignment,
	Autoformat,
	AutoImage,
	AutoLink,
	Bold,
	Base64UploadAdapter,
	BlockQuote,
	Code,
	CodeBlock,
	DataFilter,
	DataSchema,
	Essentials,
	FindAndReplace,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	GeneralHtmlSupport,
	Heading,
	Highlight,
	HorizontalLine,
	HtmlComment,
	HtmlEmbed,
	Image,
	ImageCaption,
	ImageInsert,
	ImageResize,
	ImageStyle,
	ImageToolbar,
	ImageUpload,
	Indent,
	IndentBlock,
	Italic,
	Link,
	LinkImage,
	List,
	ListProperties,
	MediaEmbed,
	MediaEmbedToolbar,
	Mention,
	PageBreak,
	Paragraph,
	PasteFromOffice,
	RemoveFormat,
	SourceEditing,
	SpecialCharacters,
	SpecialCharactersArrows,
	SpecialCharactersCurrency,
	SpecialCharactersEssentials,
	SpecialCharactersMathematical,
	SpecialCharactersText,
	StandardEditingMode,
	Strikethrough,
	Subscript,
	Superscript,
	Table,
	TableCaption,
	TableCellProperties,
	TableProperties,
	TableToolbar,
	TextTransformation,
	TodoList,
	Underline,
	WordCount,
	Undo,
} from 'ckeditor5';

const DEFAULT_EDITOR_CONFIG = {
	placeholder: 'Type the content here',
	plugins: [
		Alignment,
		Autoformat,
		AutoImage,
		AutoLink,
		Base64UploadAdapter,
		BlockQuote,
		Bold,
		Code,
		CodeBlock,
		DataFilter,
		DataSchema,
		Essentials,
		FindAndReplace,
		FontBackgroundColor,
		FontColor,
		FontFamily,
		FontSize,
		GeneralHtmlSupport,
		Heading,
		Highlight,
		HorizontalLine,
		HtmlComment,
		HtmlEmbed,
		Image,
		ImageCaption,
		ImageInsert,
		ImageResize,
		ImageStyle,
		ImageToolbar,
		ImageUpload,
		Indent,
		IndentBlock,
		Italic,
		Link,
		LinkImage,
		List,
		ListProperties,
		MediaEmbed,
		MediaEmbedToolbar,
		Mention,
		PageBreak,
		Paragraph,
		PasteFromOffice,
		RemoveFormat,
		SourceEditing,
		SpecialCharacters,
		SpecialCharactersArrows,
		SpecialCharactersCurrency,
		SpecialCharactersEssentials,
		SpecialCharactersMathematical,
		SpecialCharactersText,
		StandardEditingMode,
		Strikethrough,
		Subscript,
		Superscript,
		Table,
		TableCaption,
		TableCellProperties,
		TableProperties,
		TableToolbar,
		TextTransformation,
		TodoList,
		Underline,
		WordCount,
	],

	toolbar: {
		items: [
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
			'imageInsert',
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
			//'sourceEditing',
			//'restrictedEditingException'
		],
		shouldNotGroupWhenFull: true,
	},
	language: 'en',
	image: {
		toolbar: [
			'imageTextAlternative',
			'imageStyle:inline',
			'imageStyle:block',
			'imageStyle:side',
			'linkImage',
		],
	},
	table: {
		contentToolbar: [
			'tableColumn',
			'tableRow',
			'mergeTableCells',
			'tableCellProperties',
			'tableProperties',
		],
	},
};
@Component({
	selector: 'app-ckeditor-delta',
	templateUrl: './ckeditor.component.html',
	styleUrls: ['./ckeditor.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CkeditorComponent {
	@Input() 
	data: any = '';
	
	@Input()
	hasCustomEditorConfig: boolean = false;

	@Input()
	editorConfig: any = DEFAULT_EDITOR_CONFIG;

	@Input()
	focusOnStart: boolean = true;

	@Output()
	blur: EventEmitter<any> = new EventEmitter();

	@Output()
	dataChange: EventEmitter<any> = new EventEmitter();

	ckEditorCssFileLocation = 'ck-editor.style.css';
	editorInstance: any;
	

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
		DecoupledEditor.create(editorContainer, this.editorConfig)
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

		if (this.hasCustomEditorConfig) {
			this.setCustomEditorConfig(editor, this.editorConfig);
		}

		this.emitOutputEvents();
	}

	emitOutputEvents() {
		this.editorInstance.model.document.on('change:data', () => {
			const data = this.editorInstance.getData();
			this.dataChange.emit(data);
		});

		this.editorInstance.ui.focusTracker.on('change:isFocused', () => {
			const data = this.editorInstance.getData();
			this.blur.emit(data);
		});
	}

	setCustomEditorConfig(editor: any, customConfig: any) {
		editor.config.set(customConfig);
	}
}
