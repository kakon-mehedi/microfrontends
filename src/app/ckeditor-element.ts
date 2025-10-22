import { Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { CkeditorComponent } from './ckeditor/ckeditor.component';

export function registerCustomElement(injector: Injector) {
  const customElement = createCustomElement(CkeditorComponent, { injector });

  // Prevent NotSupportedError: element already defined
  if (!customElements.get('ckeditor-element')) {
    customElements.define('ckeditor-element', customElement);
  }
}
