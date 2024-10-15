import {
	Component,
	OnInit,
	Input,
	Output,
	EventEmitter,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	OnChanges,
	SimpleChanges, SimpleChange,
} from '@angular/core';
import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { EditorConfig, Editor } from '@ckeditor/ckeditor5-core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

class HttpUploadAdapter {
	loader: any;
	http: HttpClient;
	// token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiJBNTRENkQ4Mi02MUY2LTRCRDAtQkFGOC1CRDA2QjBBRDcyRkYiLCJzdWIiOiIzODg2NTVhOS01MjM4LTQwMzYtOWM2NC1kYWU4ZGZhZTYzNDEiLCJzaXRlX2lkIjoiRTk4NkZCMjYtQTBERC00OUU0LUI5QzUtMzQ4NTUzNzlCQTZEIiwib3JpZ2luIjoiZGVsdGEuc2VsaXNlbG9jYWwuY29tIiwic2Vzc2lvbl9pZCI6InNlbGlzZWJsb2Nrcy04NmM3Njg3MS0zZThkLTQ3ZDMtOTM2NC04NmEyMWZlZTdhZmUiLCJ1c2VyX2lkIjoiMzg4NjU1YTktNTIzOC00MDM2LTljNjQtZGFlOGRmYWU2MzQxIiwiZGlzcGxheV9uYW1lIjoiU2VsaXNlIFRlc3QgQWRtaW5uIiwic2l0ZV9uYW1lIjoiRWNhcCBUZWFtIiwidXNlcl9uYW1lIjoic2VsaXNldGVzdC5kZWx0YUBnbWFpbC5jb20iLCJlbWFpbCI6InNlbGlzZXRlc3QuZGVsdGFAZ21haWwuY29tIiwicGhvbmVfbnVtYmVyIjoiKzQxNzY1NDM1MzU2IiwibGFuZ3VhZ2UiOiJlbi1VUyIsInVzZXJfbG9nZ2VkaW4iOiJUcnVlIiwibmFtZSI6IjM4ODY1NWE5LTUyMzgtNDAzNi05YzY0LWRhZThkZmFlNjM0MSIsInVzZXJfYXV0b19leHBpcmUiOiJGYWxzZSIsInVzZXJfZXhwaXJlX29uIjoiMDEvMDEvMDAwMSAwMDowMDowMCIsImlhdCI6MTcyODkwNDk5NCwicm9sZSI6WyJhcHB1c2VyIiwiYWRtaW4iLCJkZWx0YV9lbXBsb3llZSIsImFub255bW91cyIsImZyLnVhbS5yZWFkIiwiZnIudWFtLnVwZGF0ZSIsImZyLnVhbS5kZWxldGUiLCJmci5hbm5vdW5jZW1lbnQucmVhZCIsImZyLmFubm91bmNlbWVudC5lZGl0IiwiZnIuYW5ub3VuY2VtZW50LmRlbGV0ZSJdLCJoZHIiOiJUcnVlIiwibmJmIjoxNzI4OTA0OTk0LCJleHAiOjE3Mjg5MDU0MTQsImlzcyI6IkNOPUVudGVycHJpc2UgQ2xvdWQgQXBwbGljYXRpb24gUGxhdGZvcm0iLCJhdWQiOiIqIn0.eaosqnCA1kv7qAkdRCVzuL42qbvmJ4sEOVRA_wlRynf8jerUWeEkG6YUPVSTl9D2WsDnSRki-Wpf3z0Lz1LVBAsfccV67u221Z9RlnG4VPNS_YoCg2Sqjn1kZbpqwU3Bpbl9TmDpQI6NJ3JB_hRFGsrhew_7k1SWll3wrH5l1aJcXRj3YKDQ8SItlPh46qCITV1v3FIpnZidVyEGbSlaIJMD5QRjWVQQ1XrKs-9EFEghgTmgJxHgLuWJSxDXabw_1stX0fI46XePOxDSWnqCE6Cse-bcNDANcTaGCVtsxKS1Do0qgRql4tauv-LYJr451U84NjbStEZvQysrB7Zc_w";
	header: any = new HttpHeaders({
		'Content-Type': 'application/json',
		// 'Authorization': `Bearer ${this.token}`,
	});

	constructor(loader: any, http: HttpClient) {
		this.loader = loader;
		this.http = http;
	}

	upload() {
		return this.loader.file.then((file: any) => {
			const payload = {
				"ItemId": "e37f5fe4-7ddb-420f-9c1d-a0db2689fdd8",
				"MetaData": "{\"Title\":{\"Type\":\"String\",\"Value\":file.name},\"OriginalName\":{\"Type\":\"String\",\"Value\":\"Addexpert_PARTNER_recover_account.jpg\"}}",
				"Name": file.name,
				"ParentDirectoryId": null,
				"Tags": "[\"Is-A-Resource\"]",
				"AccessModifier": "Public"
			}

			// Step 1: Get the pre-signed URL with token in headers
			return this.http.post(
				'http://microservices.seliselocal.com/api/storageservice/v22/StorageService/StorageQuery/GetPreSignedUrlForUpload',
				payload,
				{
					headers: this.header,
					withCredentials: true,
					observe: 'response',
				}
			)
				.toPromise()
				.then((response: any) => {
					const uploadUrl = response.body.UploadUrl;
					// Step 2: Upload the image to the provided URL
					return this.uploadToServer(uploadUrl, file).then(() => {
						// Step 3: After upload, get the file URL using the FileID
						return this.getFileUrl(response.body.FileId).then((fileUrl: string) => {
							// Return the uploaded image URL
							return { default: fileUrl }; // Use the returned URL as the source
						});
					});
				})
				.catch((error) => {
					console.error('Error getting pre-signed URL:', error);
					return Promise.reject(error);
				});
		});
	}

	private uploadToServer(uploadUrl: string, file: File): Promise<void> {
		return fetch(uploadUrl, {
			method: 'PUT',
			body: file,  // Upload the file directly
			headers: {
				'x-ms-blob-type': 'blockblob'
			}
		}).then(response => {
			if (!response.ok) {
				return Promise.reject(`Upload failed with status ${response.status}`);
			}
			return Promise.resolve();
		});
	}

	// New method to get the file URL using FileID
	private getFileUrl(fileId: string): Promise<string> {
		return this.http.get(`http://microservices.seliselocal.com/api/storageservice/v22/StorageService/StorageQuery/GetFile?FileId=${fileId}`,
			{ headers: this.header,
				withCredentials: true,
				}
		).toPromise()
			.then((response: any) => {
				debugger
				// Assuming the URL is returned in the response
				return response.url; // Adjust based on the actual structure of your API response
			})
			.catch(error => {
				console.error('Error getting file URL:', error);
				return Promise.reject(error);
			});
	}

	abort() {
		// Handle aborting the upload if needed
	}
}

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
					color: 'rgb(255, 0, 0)', // Red
					label: 'Red'
				},
				{
					color: 'rgb(0, 128, 0)', // Green
					label: 'Green'
				},
				{
					color: 'rgb(0, 0, 255)', // Blue
					label: 'Blue'
				},
				{
					color: 'rgb(255, 255, 0)', // Yellow
					label: 'Yellow'
				},
				// Add more colors as needed
			]
		},

		fontBackgroundColor: {
			colors: [
				{
					color: 'rgb(255, 255, 255)', // White
					label: 'White'
				},
				{
					color: 'rgb(255, 0, 0)', // Red
					label: 'Red'
				},
				{
					color: 'rgb(0, 255, 0)', // Green
					label: 'Green'
				},
				{
					color: 'rgb(173, 216, 230)', // Light Blue
					label: 'Light Blue'
				},
				// Add more colors as needed
			]
		},

		highlight: {
			options: [
				{
					model: 'yellowMarker',
					class: 'marker-yellow',
					title: 'Yellow marker',
					color: 'rgb(255, 255, 0)', // Yellow
					type: 'marker'
				},
				{
					model: 'greenMarker',
					class: 'marker-green',
					title: 'Green marker',
					color: 'rgb(0, 255, 0)', // Green
					type: 'marker'
				},
				{
					model: 'pinkMarker',
					class: 'marker-pink',
					title: 'Pink marker',
					color: 'rgb(255, 192, 203)', // Pink
					type: 'marker'
				},
				{
					model: 'blueMarker',
					class: 'marker-blue',
					title: 'Blue marker',
					color: 'rgb(0, 191, 255)', // Blue
					type: 'marker'
				},
				// Add more highlight colors as needed
			]
		},
		image: {
			toolbar: [
				'imageTextAlternative', // Add Alt Text option
				'imageStyle:full',
				'imageStyle:side',
				'imageStyle:center' // Optional: Add center option if you want it
			],
			styles: {
				options: [
					{
						name: 'full',
						title: 'Full',
						className: 'image-style-full',
						icon: '<svg>...</svg>', // Add your SVG icon
						modelElements: ['imageBlock']
					},
					{
						name: 'side',
						title: 'Side',
						className: 'image-style-side',
						icon: '<svg>...</svg>', // Add your SVG icon
						modelElements: ['imageBlock']
					},
					{
						name: 'center',
						title: 'Center',
						className: 'image-style-center', // Add custom CSS for centering
						icon: '<svg>...</svg>', // Add your SVG icon
						modelElements: ['imageBlock']
					}
				]
			}
		}
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
		editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
			return new HttpUploadAdapter(loader, this.http);
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

