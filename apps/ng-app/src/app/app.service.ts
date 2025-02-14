import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import { catchError, of, throwError, finalize } from 'rxjs';
import { environment } from "../environments/environment";

//-

export type Category = 'product' | 'equipment';

export type ComponentType = {
  name: string;
  updated_at: string; // Date;
  prices: number[];
  rate: number;
  category: Category;
};

//-

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }

    // return of();
    return throwError(() => new Error('Something went wrong. \nSorry, we couldn’t complete your request. Please try again later.'));
  }

  postData(data: ComponentType[]) {
    const headers = {
      // Authorization: 'Bearer my-token',
      'Content-Type': 'application/json',
    };

    const url = `${this.apiUrl}/kraken`;

    return this.http.post<any>(url, data, { headers }).pipe(
      catchError(this.handleError)
    );
  }
}
