import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ElementRef,
	NgZone,
	ViewChild,
} from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
	title = 'custom-element-project';
	ckeditorData: string = '';
	imageSrcArray: string[] = [];
	@ViewChild('ckeditorElementContainer', { static: false })
	ckeditorElementContainer!: ElementRef;
	private isSettingInitialData = false; // Flag to ignore initial data change event
	// token ="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOiJBNTRENkQ4Mi02MUY2LTRCRDAtQkFGOC1CRDA2QjBBRDcyRkYiLCJzdWIiOiIzODg2NTVhOS01MjM4LTQwMzYtOWM2NC1kYWU4ZGZhZTYzNDEiLCJzaXRlX2lkIjoiRTk4NkZCMjYtQTBERC00OUU0LUI5QzUtMzQ4NTUzNzlCQTZEIiwib3JpZ2luIjoiZGVsdGEuc2VsaXNlbG9jYWwuY29tIiwic2Vzc2lvbl9pZCI6InNlbGlzZWJsb2Nrcy0wZjAyYmNlYS03MWFhLTQyZjQtYjNlNi1kYjNlZTE1NGNiNjEiLCJ1c2VyX2lkIjoiMzg4NjU1YTktNTIzOC00MDM2LTljNjQtZGFlOGRmYWU2MzQxIiwiZGlzcGxheV9uYW1lIjoiU2VsaXNlIFRlc3QgQWRtaW5uIiwic2l0ZV9uYW1lIjoiRWNhcCBUZWFtIiwidXNlcl9uYW1lIjoic2VsaXNldGVzdC5kZWx0YUBnbWFpbC5jb20iLCJlbWFpbCI6InNlbGlzZXRlc3QuZGVsdGFAZ21haWwuY29tIiwicGhvbmVfbnVtYmVyIjoiKzQxNzY1NDM1MzU2IiwibGFuZ3VhZ2UiOiJlbi1VUyIsInVzZXJfbG9nZ2VkaW4iOiJUcnVlIiwibmFtZSI6IjM4ODY1NWE5LTUyMzgtNDAzNi05YzY0LWRhZThkZmFlNjM0MSIsInVzZXJfYXV0b19leHBpcmUiOiJGYWxzZSIsInVzZXJfZXhwaXJlX29uIjoiMDEvMDEvMDAwMSAwMDowMDowMCIsImlhdCI6MTczMDIxNzM5Niwicm9sZSI6WyJhcHB1c2VyIiwiYWRtaW4iLCJkZWx0YV9lbXBsb3llZSIsImFub255bW91cyIsImZyLnVhbS5yZWFkIiwiZnIudWFtLnVwZGF0ZSIsImZyLnVhbS5kZWxldGUiLCJmci5hbm5vdW5jZW1lbnQucmVhZCIsImZyLmFubm91bmNlbWVudC5lZGl0IiwiZnIuYW5ub3VuY2VtZW50LmRlbGV0ZSJdLCJoZHIiOiJUcnVlIiwibmJmIjoxNzMwMjE3Mzk2LCJleHAiOjE3MzAyMTc4MTYsImlzcyI6IkNOPUVudGVycHJpc2UgQ2xvdWQgQXBwbGljYXRpb24gUGxhdGZvcm0iLCJhdWQiOiIqIn0.AotoQPIiC2yH9zkYDz2Mqo_zNtrb6nhMIPyRlYrWspKz0mc68P_Uy-Z4jaN_rVMbpOt4Cr_CWNZ13nxZgGNsdSep1OGNVbWX74Hucz1iD4Z03t-l4wxC-k7V3QYrLEBbgWP-J81V_F0ihza6TwDydhABditYB0iiw365kn7O2YdPf0yM7xxG9iG2osDNU-al5FoGTfmym0Og_TDnUJlNmJD1957Zj2XWsyFa0j6FKdglQ6iSzka4jlbz33uYuJtfpUTz71imY5rRWDiloBBZAM0ch89H3FY_cBc6OjoWl3CqPO_nqYxiiRxhqi-XgJVETjkCPz1CNPVVZqG2KjKLqg"
	private header: any = new HttpHeaders({
		'Content-Type': 'application/json',
		// 'Authorization': `Bearer ${this.token}`,
	});
	constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone, private http: HttpClient) {}

	ngAfterViewInit() {
		this.updateCkeditorElementData();

		const messageListener = (event: MessageEvent) => {
			if (event.data) {
				console.log('Message received in child:', event.data);
				if (event.data.type === 'DATA_CHANGED') {
					this.ngZone.run(() => {
						if (!this.isSettingInitialData) {
							this.ckeditorData = event.data.data;
							this.extractImageSources(this.ckeditorData);
							this.cdr.detectChanges();
						}
					});
				} else if (event.data.type === 'SET_DATA') {
					this.ngZone.run(() => {
						this.ckeditorData = event.data.data;
						this.isSettingInitialData = true; // Set the flag before updating data
						this.updateCkeditorElementData();
						this.extractImageSources(this.ckeditorData);
						// Remove the event listener once the initial data is set
						window.removeEventListener('message', messageListener);
					});
				}
			}
		};

		// This will create memory leak
		window.addEventListener('message', messageListener);

		const ckeditorElement =
			this.ckeditorElementContainer.nativeElement.querySelector(
				'#ckeditor-element'
			);
		ckeditorElement.addEventListener('dataChange', (event: CustomEvent) => {
			if (!this.isSettingInitialData) {
				console.log('Data changed in CKEditor:', event.detail);
				this.extractImageSources(event.detail);
				parent.postMessage(
					{ type: 'DATA_CHANGED', data: event.detail },
					'*'
				);
			} else {
				console.log('Ignoring initial data change event');
				this.isSettingInitialData = false; // Reset the flag after handling the event
			}
		});
	}

	private updateCkeditorElementData() {
		const ckeditorElement =
			this.ckeditorElementContainer.nativeElement.querySelector(
				'#ckeditor-element'
			);
		if (ckeditorElement) {
			ckeditorElement.setAttribute('data', this.ckeditorData);
			const editorInstance = (ckeditorElement as any).editorInstance;
			if (editorInstance) {
				editorInstance.setData(this.ckeditorData);
			}
		}
	}

	private extractImageSources(data: string) {
		const tempDiv = document.createElement('div');
		tempDiv.innerHTML = data;
		const images = tempDiv.querySelectorAll('img');
		
		const newImageSrcArray: string[] = [];
		images.forEach((img) => {
			const src = img.getAttribute('src');
			if (src) {
				newImageSrcArray.push(src);
			}
		});

		// Detect removed images
		const removedImages = this.imageSrcArray.filter(
			(src) => !newImageSrcArray.includes(src)
		);

		if (removedImages.length) {
			console.log('Removed Image Sources:', removedImages);
			this.sendRemovedImages(removedImages); // Send HTTP call for removed images
		}

		// Update the main array and print the count
		this.imageSrcArray = newImageSrcArray;
		console.log('Current Image Sources:', this.imageSrcArray);
		console.log('Image Count:', this.imageSrcArray.length);
	}

	// Send HTTP call for each removed image
	private sendRemovedImages(removedImages: string[]) {
		removedImages.forEach((src) => {
			this.deleteImage(src).subscribe({
				next: () => console.log(`Deleted image with src: ${src}`),
				error: (err) => console.error(`Failed to delete image ${src}:`, err),
			});
		});
	}

	public deleteImage(src: string): Observable<any> {
		const arr = src.toString().split('/');
		const itemId = arr[5]; // Make sure this is the correct index for ItemId
	
		return this.http.post(
			"https://delta.selisestage.com/api/storageservice/v23/StorageService/StorageCommand/DeleteFile",
			{ ItemId: itemId }, // Ensure the key matches your API's expected field
			{
				headers: this.header,
				withCredentials: true,
				observe: 'response'
			}
		).pipe(
			map((response: any) => response)
		);
	}
	
}
