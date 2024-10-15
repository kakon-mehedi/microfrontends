import { HttpClient, HttpHeaders } from "@angular/common/http";

export class SimpleImageUploadAdapter {
	loader: any;
	http: HttpClient;
	token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiJBNTRENkQ4Mi02MUY2LTRCRDAtQkFGOC1CRDA2QjBBRDcyRkYiLCJzdWIiOiIzODg2NTVhOS01MjM4LTQwMzYtOWM2NC1kYWU4ZGZhZTYzNDEiLCJzaXRlX2lkIjoiRTk4NkZCMjYtQTBERC00OUU0LUI5QzUtMzQ4NTUzNzlCQTZEIiwib3JpZ2luIjoiZGVsdGEuc2VsaXNlbG9jYWwuY29tIiwic2Vzc2lvbl9pZCI6ImVjYXAtYTc2MTAxZjMtZjJhZi00YmRlLTkwMmMtNjJkMjFmMTQxNDgxIiwidXNlcl9pZCI6IjM4ODY1NWE5LTUyMzgtNDAzNi05YzY0LWRhZThkZmFlNjM0MSIsImRpc3BsYXlfbmFtZSI6IlNlbGlzZSBUZXN0IEFkbWluIiwic2l0ZV9uYW1lIjoiRWNhcCBUZWFtIiwidXNlcl9uYW1lIjoic2VsaXNldGVzdC5kZWx0YUBnbWFpbC5jb20iLCJlbWFpbCI6InNlbGlzZXRlc3QuZGVsdGFAZ21haWwuY29tIiwicGhvbmVfbnVtYmVyIjoibm8tcGhvbmUiLCJsYW5ndWFnZSI6ImVuLVVTIiwidXNlcl9sb2dnZWRpbiI6IlRydWUiLCJuYW1lIjoiMzg4NjU1YTktNTIzOC00MDM2LTljNjQtZGFlOGRmYWU2MzQxIiwidXNlcl9hdXRvX2V4cGlyZSI6IkZhbHNlIiwidXNlcl9leHBpcmVfb24iOiIwMS8wMS8wMDAxIDAwOjAwOjAwIiwicm9sZSI6WyJhcHB1c2VyIiwiYWRtaW4iLCJkZWx0YV9lbXBsb3llZSIsImFub255bW91cyIsImZyLmRlbHRhY291cnNlLnJlYWQiLCJmci5lbXBsb3llZXNjaGVkdWxlLnJlYWQiLCJmci5wcm9kdWN0YXNzaWdubWVudC5yZWFkIiwiZnIucHJvamVjdC5yZWFkIiwiZnIucHJvZHVjdGFzc2lnbm1lbnQuZWRpdCIsImZyLnByb2plY3QuZWRpdCIsImZyLmVtcGxveWVlLnJlYWQiLCJmci5wYXltZW50YmFzaWNpbmZvcm1hdGlvbi5lZGl0IiwiZnIucGF5bWVudGJhc2ljaW5mb3JtYXRpb24ucmVhZCIsImZyLnN1YnNjcmlwdGlvbnBsYW4ucmVhZCIsImZyLnByb2R1Y3RzdGFuZGluZy5yZWFkIiwiZnIucHJvamVjdHJlcG9ydC5yZWFkIiwiZnIuZGVsdGFjb3Vyc2UuZWRpdCIsImZyLmRtcy5yZWFkIiwiZnIuZG1zLmVkaXQiLCJmci5kbXMuZGVsZXRlIiwiZnIuZW1wbG95ZWUuZWRpdCIsImZyLmVtcGxveWVlc2NoZWR1bGUuZWRpdCIsImZyLmFwcHJvbGUucmVhZCIsImZyLnF1YWxpdHlyZXBvcnQucmVhZCIsImZyLnByb2R1Y3RzdGFuZGluZy5lZGl0IiwiZnIucHJvamVjdHJlcG9ydC5lZGl0IiwiZnIucXVhbGl0eXJlcG9ydC5lZGl0IiwiZnIudGVtcC5lZGl0IiwiZnIuY3JtLnJlYWQiLCJmci5jb3N0Y2VudGVyLmVkaXQiLCJmci5wcm9qZWN0cmVwb3IuZWRpdCIsImZyLnByb2plY3R2ZWhpY2xlLnJlYWQiXSwibmJmIjoxNzI4OTY4NDEwLCJleHAiOjE3MjkwNzY0MTAsImlzcyI6IkNOPUVudGVycHJpc2UgQ2xvdWQgQXBwbGljYXRpb24gUGxhdGZvcm0iLCJhdWQiOiIqIn0.YBOuV7QAFaZuBrYCm8xOGWKEk7dbWs4bZmXLAlOO20Y2AKGj4BC_NPYHNpbWtKyBIntj2LDnnLXaJuDdBQGHUEtVjmbHlJU5jMWE55iqomKZJXCu6z9A59SPGR-4kXtOB9WKKyXZ3iwhYcp0i7jQWzO5yliPRqOKAiXP472biJ7DPMfzRJ_JiTjO02qYqEYUqRQjMisxNKOS13Utml7_e01xnG0ESahtHbtVxJnP1bYVswuBGXqRg_mJ1yldIFCC41CdHEjGjOcIIlfe0mzOIQj0iyvrlNF0gqFy4Bqt3XaxQy_fkJu6_khBtfjMby7NOkg3ZWuxAQSK1CGvzbhl-A";
	header: any = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${this.token}`,
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
				// Assuming the URL is returned in the response
				return response.Url; // Adjust based on the actual structure of your API response
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