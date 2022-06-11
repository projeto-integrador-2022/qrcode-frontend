import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { StateDistrict } from '../models/state-district.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  endpoint = environment.baseUrl + '/states';

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getStates(): Observable<StateDistrict[]> {
    return this.http.get<StateDistrict[]>(this.endpoint)
      .pipe(
        catchError(this.handleError))
  }

  getCities(state: string): Observable<StateDistrict> {
    return this.http.get<StateDistrict>(this.endpoint + '/?nome=' )
      .pipe(
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
