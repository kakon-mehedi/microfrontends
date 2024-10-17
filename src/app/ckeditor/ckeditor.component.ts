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
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { SimpleImageUploadAdapter } from './adapters/simple-img-adapter-to-server';
import { editorConfig} from "./editorConfigs/editor-config";
import {map, Observable} from "rxjs";

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
	// token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiJBNTRENkQ4Mi02MUY2LTRCRDAtQkFGOC1CRDA2QjBBRDcyRkYiLCJzdWIiOiIzODg2NTVhOS01MjM4LTQwMzYtOWM2NC1kYWU4ZGZhZTYzNDEiLCJzaXRlX2lkIjoiRTk4NkZCMjYtQTBERC00OUU0LUI5QzUtMzQ4NTUzNzlCQTZEIiwib3JpZ2luIjoiZGVsdGEuc2VsaXNlbG9jYWwuY29tIiwic2Vzc2lvbl9pZCI6InNlbGlzZWJsb2Nrcy04NmM3Njg3MS0zZThkLTQ3ZDMtOTM2NC04NmEyMWZlZTdhZmUiLCJ1c2VyX2lkIjoiMzg4NjU1YTktNTIzOC00MDM2LTljNjQtZGFlOGRmYWU2MzQxIiwiZGlzcGxheV9uYW1lIjoiU2VsaXNlIFRlc3QgQWRtaW5uIiwic2l0ZV9uYW1lIjoiRWNhcCBUZWFtIiwidXNlcl9uYW1lIjoic2VsaXNldGVzdC5kZWx0YUBnbWFpbC5jb20iLCJlbWFpbCI6InNlbGlzZXRlc3QuZGVsdGFAZ21haWwuY29tIiwicGhvbmVfbnVtYmVyIjoiKzQxNzY1NDM1MzU2IiwibGFuZ3VhZ2UiOiJlbi1VUyIsInVzZXJfbG9nZ2VkaW4iOiJUcnVlIiwibmFtZSI6IjM4ODY1NWE5LTUyMzgtNDAzNi05YzY0LWRhZThkZmFlNjM0MSIsInVzZXJfYXV0b19leHBpcmUiOiJGYWxzZSIsInVzZXJfZXhwaXJlX29uIjoiMDEvMDEvMDAwMSAwMDowMDowMCIsImlhdCI6MTcyOTA2NTU5MSwicm9sZSI6WyJhcHB1c2VyIiwiYWRtaW4iLCJkZWx0YV9lbXBsb3llZSIsImFub255bW91cyIsImZyLnVhbS5yZWFkIiwiZnIudWFtLnVwZGF0ZSIsImZyLnVhbS5kZWxldGUiLCJmci5hbm5vdW5jZW1lbnQucmVhZCIsImZyLmFubm91bmNlbWVudC5lZGl0IiwiZnIuYW5ub3VuY2VtZW50LmRlbGV0ZSJdLCJoZHIiOiJUcnVlIiwibmJmIjoxNzI5MDY1NTkxLCJleHAiOjE3MjkwNjYwMTEsImlzcyI6IkNOPUVudGVycHJpc2UgQ2xvdWQgQXBwbGljYXRpb24gUGxhdGZvcm0iLCJhdWQiOiIqIn0.PpN2lfTFtJKA_sZpPGWMMMFa4fwwC05cVypAxnSURXNq4Pcg7ysQz7H2gOy1wE6QJXGnQg_N1152fZvjardXyZIbpY7iIiWmxc_Y7mh5gH1lEADLAzvIhklBKu_bEtSfkp6xNJcrOpoHMhdz3w5Ged5HRmmp7mMCk9LjxU6Xi0tid3SBXlBvL0M-2DHaibLY8o1a8FedcRNbeh_NKtFAD4j0VXeHlD1iJK4IvOWHjyPvlPs_Eu3l5vzsWmZ8hLArxuAppO4AyEOSGDUSsmerDaT0LPxIywDKWVi8md6ssJCoUMYhh5KsH44HU3Hnxl2diTMGcV1y02tl7hfmwpY5MQ"


	public config = editorConfig;
	private header: any = new HttpHeaders({
		'Content-Type': 'application/json',
		// 'Authorization': `Bearer ${this.token}`,
	});

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
		const changes = editor.model.document.differ.getChanges();

		changes.forEach((change) => {
			if (change.type === 'remove' && change.name === 'imageBlock') {
				for (let [key, value] of change.attributes) {
					const val: any = value;
					if (key == 'src') {
						var arr = val.toString().split('/');
						const ItemId = arr[5];
						// this.deleteFile(ItemId).subscribe((response) => {
						// 	console.log(response.body)
						// });
					}
				}
			}
		});
		this.dataChange.emit(data);
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

	public deleteFile(itemId: string): Observable<any> {
		return this.http.post("https://delta.selisestage.com/api/storageservice/v23/StorageService/StorageCommand/DeleteFile",
			{ ItemId: itemId },
			{ headers: this.header, withCredentials: true, observe: 'response' }
		).pipe(map((response) => {
			return response
		}));
	}
}
