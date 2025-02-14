import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar>
      <span>© 2025 - ASN Kraken. All rights reserved.</span>
    </mat-toolbar>
  `,
  styles: [
    `
      :host {
        position: fixed;
        bottom: 0;
        width: 100%;
      }
    `,
  ],
})
export class FooterComponent {}
