import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { StateDistrict } from '../models/state_district.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  endpoint = 'http://localhost:4000/estados';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getStates(): Observable<StateDistrict[]> {
    return this.http.get<StateDistrict[]>(this.endpoint)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getCities(state: string): Observable<StateDistrict> {
    return this.http.get<StateDistrict>(this.endpoint + '/?nome=' + state + '/cidades')
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
