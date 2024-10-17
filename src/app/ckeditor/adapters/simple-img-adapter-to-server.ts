import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from 'guid-typescript';

export class SimpleImageUploadAdapter {
	loader: any;
	http: HttpClient;
	token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiJBNTRENkQ4Mi02MUY2LTRCRDAtQkFGOC1CRDA2QjBBRDcyRkYiLCJzdWIiOiIzODg2NTVhOS01MjM4LTQwMzYtOWM2NC1kYWU4ZGZhZTYzNDEiLCJzaXRlX2lkIjoiRTk4NkZCMjYtQTBERC00OUU0LUI5QzUtMzQ4NTUzNzlCQTZEIiwib3JpZ2luIjoiZGVsdGEuc2VsaXNlc3RhZ2UuY29tIiwic2Vzc2lvbl9pZCI6InNlbGlzZWJsb2Nrcy0zZTJmZDhlMS1mNzE2LTRkNjItYTQ0Ny1jZDU2MmVlNzM0NWEiLCJ1c2VyX2lkIjoiMzg4NjU1YTktNTIzOC00MDM2LTljNjQtZGFlOGRmYWU2MzQxIiwiZGlzcGxheV9uYW1lIjoiU2VsaXNlIFRlc3QgQWRtaW4iLCJzaXRlX25hbWUiOiJFY2FwIFRlYW0iLCJ1c2VyX25hbWUiOiJzZWxpc2V0ZXN0LmRlbHRhQGdtYWlsLmNvbSIsImVtYWlsIjoic2VsaXNldGVzdC5kZWx0YUBnbWFpbC5jb20iLCJwaG9uZV9udW1iZXIiOiJuby1waG9uZSIsImxhbmd1YWdlIjoiZW4tVVMiLCJ1c2VyX2xvZ2dlZGluIjoiVHJ1ZSIsIm5hbWUiOiIzODg2NTVhOS01MjM4LTQwMzYtOWM2NC1kYWU4ZGZhZTYzNDEiLCJ1c2VyX2F1dG9fZXhwaXJlIjoiRmFsc2UiLCJ1c2VyX2V4cGlyZV9vbiI6IjAxLzAxLzAwMDEgMDA6MDA6MDAiLCJpYXQiOjE3MjkxNjkzNjYsInJvbGUiOlsiYWRtaW4iLCJmci5wYXlyb2xsLnJlYWQiLCJhcHB1c2VyIiwiYW5vbnltb3VzIiwiZnIucHJvamVjdHZlaGljbGUucmVhZCIsImRlbHRhX2VtcGxveWVlIiwiZnIubGVhdmVyZXF1ZXN0LmVkaXQiLCJmci5wcm9qZWN0cmVwb3IuZWRpdCIsImZyLnBheXJvbGwuZWRpdCIsImZyLmNvc3RjZW50ZXIuZWRpdCJdLCJoZHIiOiJUcnVlIiwibmJmIjoxNzI5MTY5MzY2LCJleHAiOjE3MjkxNjk3ODYsImlzcyI6IkNOPUVudGVycHJpc2UgQ2xvdWQgQXBwbGljYXRpb24gUGxhdGZvcm0iLCJhdWQiOiIqIn0.KBDPBbyRfJJ3sOF-TEPuLB9OT3DFH5QG9WoHrLKX-62OvYZIP1bmquCsChY0Kz1NWEQSgEx2bIBjcgpLhoKeu6b0EI_a6_wr6CZP_OUnuD5-zjMa-iTGnxosC6kRRpTpbyXte42wV6u8EpJpYWeegesZhq6ORwEAid-96HAK6kkmRiu2Hp-QkzbJ4ZwT5q8O1jnjoahWciosmFZUdu_3ivLQBwwkvOMbIzOvp_715guyyjPZg66CKHJVBSeB9mJ-hhE9iE9cacSqBvmua7ZQ-JkQo8MhgIMeVt189oHd3GrmWLMHBmgdBVW9q97tgpcfbxejOkpISLTrBTs9pRgJXw"
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
				'https://delta.selisestage.com/api/storageservice/v23/StorageService/StorageQuery/GetPreSignedUrlForUpload',
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
		return this.http.get(`https://delta.selisestage.com/api/storageservice/v23/StorageService/StorageQuery/GetFile?FileId=${fileId}`,
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
