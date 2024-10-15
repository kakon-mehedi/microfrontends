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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SimpleImageUploadAdapter } from './adapters/simple-img-adapter-to-server';

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
		fontColor: {
			colors: [
				{
					color: 'rgb(255, 0, 0)',
					label: 'Red'
				},
				{
					color: 'rgb(0, 128, 0)',
					label: 'Green'
				},
				{
					color: 'rgb(0, 0, 255)',
					label: 'Blue'
				},
				{
					color: 'rgb(255, 255, 0)',
					label: 'Yellow'
				},
				{
					color: 'rgb(255, 165, 0)',
					label: 'Orange'
				},
				{
					color: 'rgb(128, 0, 128)',
					label: 'Purple'
				},
				{
					color: 'rgb(0, 0, 0)',
					label: 'Black'
				},
				{
					color: 'rgb(128, 128, 128)',
					label: 'Gray'
				},
				{
					color: 'rgb(255, 192, 203)',
					label: 'Pink'
				},
				{
					color: 'rgb(0, 255, 255)',
					label: 'Cyan'
				},
				{
					color: 'rgb(128, 0, 0)',
					label: 'Maroon'
				},
				{
					color: 'rgb(0, 128, 128)',
					label: 'Teal'
				},
				{
					color: 'rgb(255, 105, 180)',
					label: 'Hot Pink'
				},
				{
					color: 'rgb(75, 0, 130)',
					label: 'Indigo'
				},
				{
					color: 'rgb(255, 255, 255)',
					label: 'White'
				}
			]
		},

		fontBackgroundColor: {
			colors: [
				{
					color: 'rgb(255, 255, 255)',
					label: 'White'
				},
				{
					color: 'rgb(255, 0, 0)',
					label: 'Red'
				},
				{
					color: 'rgb(0, 255, 0)',
					label: 'Green'
				},
				{
					color: 'rgb(173, 216, 230)',
					label: 'Light Blue'
				},
				{
					color: 'rgb(0, 0, 255)',
					label: 'Blue'
				},
				{
					color: 'rgb(255, 255, 0)',
					label: 'Yellow'
				},
				{
					color: 'rgb(255, 165, 0)',
					label: 'Orange'
				},
				{
					color: 'rgb(128, 0, 128)',
					label: 'Purple'
				},
				{
					color: 'rgb(0, 0, 0)',
					label: 'Black'
				},
				{
					color: 'rgb(240, 230, 140)',
					label: 'Khaki'
				},
				{
					color: 'rgb(255, 192, 203)',
					label: 'Pink'
				},
				{
					color: 'rgb(47, 79, 79)',
					label: 'Dark Slate Gray'
				},
				{
					color: 'rgb(224, 255, 255)',
					label: 'Light Cyan'
				},
				{
					color: 'rgb(255, 239, 213)',
					label: 'Papaya Whip'
				},
				{
					color: 'rgb(245, 222, 179)',
					label: 'Wheat'
				}
			]
		},

		highlight: {
			options: [
				{
					model: 'yellowMarker',
					class: 'marker-yellow',
					title: 'Yellow marker',
					color: 'rgb(255, 255, 0)',
					type: 'marker'
				},
				{
					model: 'greenMarker',
					class: 'marker-green',
					title: 'Green marker',
					color: 'rgb(0, 255, 0)',
					type: 'marker'
				},
				{
					model: 'pinkMarker',
					class: 'marker-pink',
					title: 'Pink marker',
					color: 'rgb(255, 192, 203)',
					type: 'marker'
				},
				{
					model: 'blueMarker',
					class: 'marker-blue',
					title: 'Blue marker',
					color: 'rgb(0, 191, 255)',
					type: 'marker'
				},
				{
					model: 'orangeMarker',
					class: 'marker-orange',
					title: 'Orange marker',
					color: 'rgb(255, 165, 0)',
					type: 'marker'
				},
				{
					model: 'purpleMarker',
					class: 'marker-purple',
					title: 'Purple marker',
					color: 'rgb(128, 0, 128)',
					type: 'marker'
				},
				{
					model: 'cyanMarker',
					class: 'marker-cyan',
					title: 'Cyan marker',
					color: 'rgb(0, 255, 255)',
					type: 'marker'
				},
				{
					model: 'limeMarker',
					class: 'marker-lime',
					title: 'Lime marker',
					color: 'rgb(0, 255, 0)',
					type: 'marker'
				},
				{
					model: 'redMarker',
					class: 'marker-red',
					title: 'Red marker',
					color: 'rgb(255, 0, 0)',
					type: 'marker'
				}
			]
		},
		image: {
			toolbar: [
				'imageTextAlternative',
				'imageStyle:full',
				'imageStyle:side',
				'imageStyle:center',
			],
			styles: {
				options: [
					{
						name: 'full',
						title: 'Full',
						className: 'image-style-full',
						icon: '<svg>...</svg>', // Add your SVG icon
						modelElements: ['imageBlock'],
					},
					{
						name: 'side',
						title: 'Side',
						className: 'image-style-side',
						icon: '<svg>...</svg>', // Add your SVG icon
						modelElements: ['imageBlock'],
					},
					{
						name: 'center',
						title: 'Center',
						className: 'image-style-center', // Add custom CSS for centering
						icon: '<svg>...</svg>', // Add your SVG icon
						modelElements: ['imageBlock'],
					},
				],
			},
		},
	};

	private editorInstance: Editor | null = null;

	constructor(private cdr: ChangeDetectorRef, private http: HttpClient) {}

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

		// Replace Base64 adapter with the new HttpUploadAdapter
		editor.plugins.get('FileRepository').createUploadAdapter = (
			loader: any
		) => {
			return new SimpleImageUploadAdapter(loader, this.http);
		};

		if (this.data) {
			editor.setData(this.data);
		}

		// Attach the toolbar to the container.
		const toolbarContainer = document.querySelector('#toolbar-container');
		if (toolbarContainer) {
			const editorView = editor.ui.view as any;
			if (editorView.toolbar && editorView.toolbar.element) {
				toolbarContainer.appendChild(editorView.toolbar.element);
			}
		}
	}
}
