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
import { Editor } from '@ckeditor/ckeditor5-core';
import { HttpClient } from '@angular/common/http';
import { SimpleImageUploadAdapter } from './adapters/simple-img-adapter-to-server';
import { editorConfig} from "./editorConfigs/editor-config";

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

	public config = editorConfig;

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
