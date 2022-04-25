import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Qr } from '../models/qr';

@Injectable({
    providedIn: 'root'
})
export class QrGeneratorService {

    endpoint = 'http://localhost:4203/qr';
    //endpoint = 'http://localhost:8080/administrator';

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }

    saveNewQr(qr: Qr): Observable<Qr> {
        return this.http
            .post<Qr>(this.endpoint, JSON.stringify(qr), this.httpOptions)
            .pipe(
                retry(2),
                catchError(this.handleError)
            )
    }

    getQrList(): Observable<Qr> {
        return this.http
            .get<Qr>(this.endpoint)
            .pipe(
                retry(2),
                catchError(this.handleError)
            )
    }

    getQr(id: number): Observable<Qr> {
        return this.http
            .get<Qr>(this.endpoint + '/' + id)
            .pipe(
                retry(2),
                catchError(this.handleError)
            )
    }

    updateItem(id: number, qr: Qr): Observable<Qr> {
        return this.http
            .put<Qr>(this.endpoint + '/' + id, JSON.stringify(qr), this.httpOptions)
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