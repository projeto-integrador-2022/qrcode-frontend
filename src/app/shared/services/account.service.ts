import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Account } from '../models/account';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  authEndpoint = environment.baseUrl + '/authenticate';
  accountEndpoint = environment.baseUrl + '/administrator';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  
  createAccount(account : Account): Observable<Account> {
    return this.http
      .post<Account>(this.accountEndpoint, JSON.stringify(account), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  login(loginParams : any): Observable<Account> {
    return this.http
      .post<Account>(this.authEndpoint, JSON.stringify(loginParams), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };


}
