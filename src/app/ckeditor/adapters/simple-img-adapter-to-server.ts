import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Guid } from 'guid-typescript';

export class SimpleImageUploadAdapter {
	loader: any;
	http: HttpClient;
	token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiJBNTRENkQ4Mi02MUY2LTRCRDAtQkFGOC1CRDA2QjBBRDcyRkYiLCJzdWIiOiIzODg2NTVhOS01MjM4LTQwMzYtOWM2NC1kYWU4ZGZhZTYzNDEiLCJzaXRlX2lkIjoiRTk4NkZCMjYtQTBERC00OUU0LUI5QzUtMzQ4NTUzNzlCQTZEIiwib3JpZ2luIjoiZGVsdGEuc2VsaXNlbG9jYWwuY29tIiwic2Vzc2lvbl9pZCI6InNlbGlzZWJsb2Nrcy04NmM3Njg3MS0zZThkLTQ3ZDMtOTM2NC04NmEyMWZlZTdhZmUiLCJ1c2VyX2lkIjoiMzg4NjU1YTktNTIzOC00MDM2LTljNjQtZGFlOGRmYWU2MzQxIiwiZGlzcGxheV9uYW1lIjoiU2VsaXNlIFRlc3QgQWRtaW5uIiwic2l0ZV9uYW1lIjoiRWNhcCBUZWFtIiwidXNlcl9uYW1lIjoic2VsaXNldGVzdC5kZWx0YUBnbWFpbC5jb20iLCJlbWFpbCI6InNlbGlzZXRlc3QuZGVsdGFAZ21haWwuY29tIiwicGhvbmVfbnVtYmVyIjoiKzQxNzY1NDM1MzU2IiwibGFuZ3VhZ2UiOiJlbi1VUyIsInVzZXJfbG9nZ2VkaW4iOiJUcnVlIiwibmFtZSI6IjM4ODY1NWE5LTUyMzgtNDAzNi05YzY0LWRhZThkZmFlNjM0MSIsInVzZXJfYXV0b19leHBpcmUiOiJGYWxzZSIsInVzZXJfZXhwaXJlX29uIjoiMDEvMDEvMDAwMSAwMDowMDowMCIsImlhdCI6MTcyODk4MDM2OSwicm9sZSI6WyJhcHB1c2VyIiwiYWRtaW4iLCJkZWx0YV9lbXBsb3llZSIsImFub255bW91cyIsImZyLnVhbS5yZWFkIiwiZnIudWFtLnVwZGF0ZSIsImZyLnVhbS5kZWxldGUiLCJmci5hbm5vdW5jZW1lbnQucmVhZCIsImZyLmFubm91bmNlbWVudC5lZGl0IiwiZnIuYW5ub3VuY2VtZW50LmRlbGV0ZSJdLCJoZHIiOiJUcnVlIiwibmJmIjoxNzI4OTgwMzY5LCJleHAiOjE3Mjg5ODA3ODksImlzcyI6IkNOPUVudGVycHJpc2UgQ2xvdWQgQXBwbGljYXRpb24gUGxhdGZvcm0iLCJhdWQiOiIqIn0.GldrqC-sOgMBkFEeYuIVI8fyzhcfEkq8vwGMz3EhRtj3WVwcUlMh4gx6SdLD-jpnoCcGjEZFtuccZf0K_PydUX9BR5XE9WxVLisvGlDn6m96PuLRHKLyGWS0eWJ1h7CwqCM3fQWjdyCZC8a_PGH6jCqqdeiKkSngK-qV3ZEqKWmu85GLsJN0yC7X6WvGTn3tWZYXo6Vyiv7Bj8i31MTN1jyIUEAv_KDn4LLpqV7cjBGoQOUHHxJeV2-RJ30lKCNWO2rFKRorTZnDodi5paocyweogVUZVWaT5mXRsdyhB2zofP75g3gAUgEIlu3eUUFsZRnerfQlup_2pqn-8zabwg"
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
