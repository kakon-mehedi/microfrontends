import {
	AfterViewInit,
	ChangeDetectorRef,
	Component,
	ElementRef,
	NgZone,
	ViewChild,
} from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
	title = 'custom-element-project';
	ckeditorData: string = '';
	@ViewChild('ckeditorElementContainer', { static: false })
	ckeditorElementContainer!: ElementRef;
	private isSettingInitialData = false; // Flag to ignore initial data change event

	constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

	ngAfterViewInit() {
		this.updateCkeditorElementData();

		const messageListener = (event: MessageEvent) => {
			if (event.data) {
				console.log('Message received in child:', event.data);
				if (event.data.type === 'DATA_CHANGED') {
					this.ngZone.run(() => {
						if (!this.isSettingInitialData) {
							this.ckeditorData = event.data.data;
							this.cdr.detectChanges();
						}
					});
				} else if (event.data.type === 'SET_DATA') {
					this.ngZone.run(() => {
						this.ckeditorData = event.data.data;
						this.isSettingInitialData = true; // Set the flag before updating data
						this.updateCkeditorElementData();
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
}
