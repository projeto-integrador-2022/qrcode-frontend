import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {
    public isLoggedIn$: BehaviorSubject<boolean>;

    constructor() {
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
        this.isLoggedIn$ = new BehaviorSubject(isLoggedIn);
    }

    getAuthStatus() {
        if (this.isLoggedIn$.value) {
            return true;
        } else return false;
    }
    
    getUser() {
        return localStorage.getItem('user');
    }

    login() {
        // logic
        localStorage.setItem('loggedIn', 'true');
        this.isLoggedIn$.next(true);
    }

/*
login(jwt: string) {
    if (jwt) {
        localStorage.setItem('loggedIn', 'true');
        this.isLoggedIn$.next(true);
    } else {
        localStorage.setItem('loggedIn', 'false');
        this.isLoggedIn$.next(false);
    }
}
*/
    logout() {
        // logic
        localStorage.setItem('loggedIn', 'false');
        this.isLoggedIn$.next(false);
    }
}