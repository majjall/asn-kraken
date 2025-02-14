import * as Excel from 'exceljs';
import { Subscription, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AppService, Category, ComponentType} from "../app.service";

const getCellValue = (row: Excel.Row, cellIndex: number) => {
  const cell = row.getCell(cellIndex);

  return cell.value ? cell.value.toString() : '';
};

const transformDate = (value: string) => {
  const date = new Date(value);

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const transformCategory = (value: string) => {
  return value?.includes('Equipment') ? 'equipment' : 'product';
};

const transformPrices = (value: string) => {
  const prices = value.split(';');

  return prices.map((p) => {
    p = p.replace(',', '.');
    return +p <= 0 ? 0 : parseInt(p);
  });
};

const getComponentFromData = (row: any, name: string) => {
  return {
    name,
    updated_at: transformDate(getCellValue(row, 2)), // (YYYY-MM-DD)
    prices: transformPrices(getCellValue(row, 3)), // number[];
    rate: +getCellValue(row, 4),
    category: transformCategory(name) as Category,
  };
};

//-

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, CommonModule],
  styles: [
    `
      mat-card {
        max-width: 600px;
        margin: 20px auto;
      }
    `,
  ],
})
export class FileUploadComponent {
  @ViewChild('fileInput', { static: false }) fileInputRef!: ElementRef;

  selectedFile: File | null = null;

  excelData: ComponentType[] = [];
  dataParsed = false;

  status: "initial" | "uploading" | "success" | "fail" = "initial";
  upload: Subscription | null = null;

  constructor(private service: AppService) {}

  selectFile(event: Event) {
    this.status = "initial";
    this.excelData = [];
    this.fileInputRef.nativeElement.value = null;
    this.fileInputRef.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      this.selectedFile = input.files[0];
      this.parseFile();
    }
  }

  private parseFile () {
    if (!this.selectedFile) {
      return;
    }

    const workbook = new Excel.Workbook();
    const reader = new FileReader();

    reader.readAsArrayBuffer(this.selectedFile!);
    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer;

      workbook.xlsx.load(buffer).then((wb) => {
        const sheet = wb.worksheets[0];

        sheet.eachRow((row) => {
          const name = getCellValue(row, 1);

          // name check
          if (name === 'Name' || name === 'name') return;

          const component = getComponentFromData(row, name);
          const existingIndex = this.excelData.findIndex(
            (el) => el.name === name
          );

          if (existingIndex != -1) {
            this.excelData[existingIndex] = component;
          } else {
            this.excelData.push(component);
          }
        });

        this.dataParsed = this.excelData.length > 0;
        console.log('parsed file', this.dataParsed, this.selectedFile);
      });
    };
  }

  uploadFile() {
    if (!this.selectedFile) {
      return;
    }

    console.log('uploadFile');

    this.status = 'uploading';
    this.upload = this.service.postData(this.excelData).subscribe({
      next: (response) => {
        console.log('File uploaded successfully:', response);
        this.status = 'success';
      },
      error: (e) => {
        console.error(e);
        this.status = 'fail';
        // return of();
      },
      complete: () => console.info('upload complete!')
    });
  }
}
