import Excel from 'exceljs';
import { catchError, finalize, of, Subscription } from 'rxjs';

import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

type Category = 'product' | 'equipment';

type ComponentType = {
  name: string;
  updated_at: string; // Date;
  prices: number[];
  rate: number;
  category: Category;
};

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
  imports: [MatIconModule, MatButtonModule, MatCardModule, CommonModule],
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
  selectedFile: File | null = null;

  excelData: ComponentType[] = [];

  constructor(private http: HttpClient) {}

  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      this.selectedFile = input.files[0];

      console.log('onFileSelected', this.selectedFile);

      const workbook = new Excel.Workbook();
      const reader = new FileReader();

      reader.readAsArrayBuffer(this.selectedFile);

      // const content = await workbook.xlsx.readFile(this.selectedFile.name);
      reader.onload = () => {
        const buffer = reader.result as ArrayBuffer;
        workbook.xlsx.load(buffer).then((wb) => {
          const sheet = wb.worksheets[0];

          sheet.eachRow((row) => {
            const name = getCellValue(row, 1);

            // check name
            if (name === 'Name' || name === 'name') return;

            const existingIndex = this.excelData.findIndex(
              (el) => el.name === name
            );
            if (existingIndex != -1) {
              this.excelData[existingIndex] = getComponentFromData(row, name);
              return;
            }

            this.excelData.push(getComponentFromData(row, name));
          });

          this.postData(this.excelData);
        });
      };
    }
  }

  postData(data: ComponentType[]) {
    const headers = {
      // Authorization: 'Bearer my-token',
      'Content-Type': 'application/json',
    };

    const url = 'http://localhost:3000/api/kraken';

    this.http
      .post<any>(url, data, { headers })
      .pipe(
        catchError((error: any) => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
          return of();
        })
      )
      .subscribe((result) => {
        console.log('done posting', result);
      });
  }
}
