import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <span>My Application</span>
      <span class="spacer"></span>
    </mat-toolbar>
  `,
})
export class HeaderComponent {}
