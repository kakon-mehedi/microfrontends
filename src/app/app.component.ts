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
	ckeditorData: string = '<p>Initial data from ng8</p>';
	@ViewChild('ckeditorElementContainer', { static: false })
	ckeditorElementContainer!: ElementRef;

	constructor(private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

	ngAfterViewInit() {
		this.updateCkeditorElementData();

		window.addEventListener('message', (event) => {
			if (event.data && event.data.type === 'DATA_CHANGED') {
				this.ngZone.run(() => {
					this.ckeditorData = event.data.data;
					this.cdr.detectChanges();
				});
			}
		});

		const ckeditorElement =
			this.ckeditorElementContainer.nativeElement.querySelector(
				'#ckeditor-element'
			);
		ckeditorElement.addEventListener('dataChange', (event: CustomEvent) => {
			console.log('Data changed in CKEditor:', event.detail);
			parent.postMessage(
				{ type: 'DATA_CHANGED', data: event.detail },
				'*'
			);
		});
	}

	private updateCkeditorElementData() {
		const ckeditorElement =
			this.ckeditorElementContainer.nativeElement.querySelector(
				'#ckeditor-element'
			);
		if (ckeditorElement) {
			ckeditorElement.setAttribute('data', this.ckeditorData);
		}
	}
}
