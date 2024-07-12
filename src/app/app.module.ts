import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { CkeditorComponent } from './ckeditor/ckeditor.component'; // Adjust this import based on your project structure
import { createCustomElement } from '@angular/elements';

@NgModule({
  declarations: [
    AppComponent,
    CkeditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CKEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(injector: Injector) {
    // Register custom element directly here if not using a separate function
    const customElement = createCustomElement(CkeditorComponent, { injector });
    customElements.define('ckeditor-element', customElement);
  }
}