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
		// this.updateCkeditorElementData();

		window.addEventListener('message', (event) => {
			if (event.data && event.data.type === 'DATA_CHANGED') {
				this.ngZone.run(() => {
					this.ckeditorData = this.ckeditorData;
					console.log(event.data.data);
					this.cdr.detectChanges();
				});
			}
		});

		const ckEditorContainer =
			this.ckeditorElementContainer.nativeElement.querySelector(
				'#ckeditor-element'
			) as HTMLElement;

		const ckeditorElement = ckEditorContainer.querySelector('#editor');

		if (!ckeditorElement) return;

		(ckeditorElement as any).addEventListener(
			'keydown',
			(event: CustomEvent) => {
				console.log('Data changed in CKEditor:', event.detail);
				parent.postMessage(
					{ type: 'DATA_CHANGED', data: event.detail },
					'*'
				);
			}
		);
	}

	private updateCkeditorElementData() {
		const ckEditorContainer =
			this.ckeditorElementContainer.nativeElement.querySelector(
				'#ckeditor-element'
			) as HTMLElement;

		const ckeditorElement = ckEditorContainer.querySelector('#editor');

		if (!ckeditorElement) return;

		if (ckeditorElement) {
			ckeditorElement.innerHTML = this.ckeditorData;
		}
	}
}

/**
 * Solution 1: Web component
 * Why it did not work ?
 * Duplicate module error => Need to remove from the whole app
 *
 *
 * Solution 2: Iframe
 */

/**
 * Build the app by npm run build - build scrpt from package .json
 * We use ngx-build-plus for single build
 * otherwise amader delta te integrate korte gele webpack e config korte hoto
 * When adding to delta
 * Angular.json er build er assests[] array te script gula load koray dite hobe
 *
 * static file er path change kore dite hobe index.html er
 */

// Add this on angular.json build assets array

// {
// 	"glob": "**/*",
// 	"input": "static",
// 	"output": "/static"
//   }
