import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from 'guid-typescript';

export class SimpleImageUploadAdapter {
	loader: any;
	http: HttpClient;
	// token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiJBNTRENkQ4Mi02MUY2LTRCRDAtQkFGOC1CRDA2QjBBRDcyRkYiLCJzdWIiOiIzODg2NTVhOS01MjM4LTQwMzYtOWM2NC1kYWU4ZGZhZTYzNDEiLCJzaXRlX2lkIjoiRTk4NkZCMjYtQTBERC00OUU0LUI5QzUtMzQ4NTUzNzlCQTZEIiwib3JpZ2luIjoiZGVsdGEuc2VsaXNlbG9jYWwuY29tIiwic2Vzc2lvbl9pZCI6InNlbGlzZWJsb2Nrcy04NmM3Njg3MS0zZThkLTQ3ZDMtOTM2NC04NmEyMWZlZTdhZmUiLCJ1c2VyX2lkIjoiMzg4NjU1YTktNTIzOC00MDM2LTljNjQtZGFlOGRmYWU2MzQxIiwiZGlzcGxheV9uYW1lIjoiU2VsaXNlIFRlc3QgQWRtaW5uIiwic2l0ZV9uYW1lIjoiRWNhcCBUZWFtIiwidXNlcl9uYW1lIjoic2VsaXNldGVzdC5kZWx0YUBnbWFpbC5jb20iLCJlbWFpbCI6InNlbGlzZXRlc3QuZGVsdGFAZ21haWwuY29tIiwicGhvbmVfbnVtYmVyIjoiKzQxNzY1NDM1MzU2IiwibGFuZ3VhZ2UiOiJlbi1VUyIsInVzZXJfbG9nZ2VkaW4iOiJUcnVlIiwibmFtZSI6IjM4ODY1NWE5LTUyMzgtNDAzNi05YzY0LWRhZThkZmFlNjM0MSIsInVzZXJfYXV0b19leHBpcmUiOiJGYWxzZSIsInVzZXJfZXhwaXJlX29uIjoiMDEvMDEvMDAwMSAwMDowMDowMCIsImlhdCI6MTcyODk4NDIxMiwicm9sZSI6WyJhcHB1c2VyIiwiYWRtaW4iLCJkZWx0YV9lbXBsb3llZSIsImFub255bW91cyIsImZyLnVhbS5yZWFkIiwiZnIudWFtLnVwZGF0ZSIsImZyLnVhbS5kZWxldGUiLCJmci5hbm5vdW5jZW1lbnQucmVhZCIsImZyLmFubm91bmNlbWVudC5lZGl0IiwiZnIuYW5ub3VuY2VtZW50LmRlbGV0ZSJdLCJoZHIiOiJUcnVlIiwibmJmIjoxNzI4OTg0MjEyLCJleHAiOjE3Mjg5ODQ2MzIsImlzcyI6IkNOPUVudGVycHJpc2UgQ2xvdWQgQXBwbGljYXRpb24gUGxhdGZvcm0iLCJhdWQiOiIqIn0.hjdTsdwACHQdoGTEoOMtPMMzVFEBptFCFrbMTx_0APBbczf0NPs-tccVUsWxmFb9bz97z4yBPiEPVWXWsZUp9j154-hMRhgvUCaabhVRN75FTdN8DGt8S_5zHfdqRrwVhjqdmNCAdMFsMj3nTEWHlaZoy4olXVNNLqVUst4jeYxOcV1kTEJ71R9NmST4SR5xzAwfRv2LO88Lxl_W8TupCi42LIPNA_pKv62kYrUbmtCRpengbm8qOXH6DEd3qVv3GuUMUGVMlO9HOTDIXCCjLzXUmKUDdALvYEgRfjEiqm-UultwlKpdai7mQ0RAK98WYk35oxWu6z0yXyAcZQ89wg"
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
				"ItemId": Guid.create().toString(),
				"MetaData": JSON.stringify({
					"Title": {
						"Type": "String",
						"Value": file.name
					},
					"OriginalName": {
						"Type": "String",
						"Value": file.name
					}
				}),
				"Name": file.name,
				"ParentDirectoryId": null,
				"Tags": JSON.stringify(["Is-A-Resource"]),
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
							return { default: fileUrl };
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
			body: file,
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
				return response.Url;
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
