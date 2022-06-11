import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { Qr } from '../models/qr';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class QrGeneratorService {

    endpoint = environment.baseUrl + '/qrcode';
    //endpoint = 'http://localhost:8080/administrator';

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
    }

    saveNewQr(qr: Qr): Observable<Qr> {
        return this.http
            .post<Qr>(this.endpoint, JSON.stringify(qr), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getQrList(): Observable<Qr> {
        return this.http
            .get<Qr>(this.endpoint + '/all/' + localStorage.getItem('user'), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    getQr(id: number): Observable<Qr> {
        return this.http
            .get<Qr>(this.endpoint + '/' + id)
            .pipe(
                catchError(this.handleError)
            );
    }

    updateQr(id: number, qr: Qr): Observable<Qr> {
        return this.http
            .put<Qr>(this.endpoint, JSON.stringify(qr), this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteQr(id: number): Observable<Qr> {
        return this.http
            .delete<Qr>(this.endpoint + '/' + id, this.httpOptions)
            .pipe(
                catchError(this.handleError)
            );
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