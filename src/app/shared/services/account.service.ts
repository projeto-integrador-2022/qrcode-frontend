import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  endpoint = 'http://qrctbackend.herokuapp.com/authenticate';
  //endpoint = 'http://localhost:8080/administrator';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  
  createAccount(account : Account): Observable<Account> {
    return this.http
      .post<Account>(this.endpoint, JSON.stringify(account), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  login(loginParams : any): Observable<Account> {
    return this.http
      .post<Account>(this.endpoint, JSON.stringify(loginParams), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  // getAccounts(): Observable<Account> {
  //   return this.http
  //     .get<Account>(this.endpoint)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     )
  // }

  // getItem(id: number): Observable<Account> {
  //   return this.http
  //     .get<Account>(this.endpoint + '/' + id)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     )
  // }

  // updateItem(id: number, item: Account): Observable<Account> {
  //   return this.http
  //     .put<Account>(this.endpoint + '/' + id, JSON.stringify(item), this.httpOptions)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     )
  // }

  // deleteItem(id: number) {
  //   return this.http
  //     .delete<Account>(this.endpoint + '/' + id, this.httpOptions)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     )
  // }

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
