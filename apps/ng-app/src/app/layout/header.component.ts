import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from "@angular/material/button";
// import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar color="primary">
      <span>ASN Kraken</span>
      <span class="spacer"></span>
      <button mat-raised-button color="secondary" (click)="signin()">Sign In</button>
    </mat-toolbar>
  `,
})
export class HeaderComponent {
  signin() {
    console.log('Not yet implemented!');
  }
}
