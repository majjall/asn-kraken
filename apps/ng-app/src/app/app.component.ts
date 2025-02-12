import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FileUploadComponent } from './file-upload/file-upload.component';
import { FooterComponent } from './layout/footer.component';
import { HeaderComponent } from './layout/header.component';

@Component({
  imports: [
    HeaderComponent,
    FooterComponent,
    FileUploadComponent,
    RouterModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ng-app';
}
