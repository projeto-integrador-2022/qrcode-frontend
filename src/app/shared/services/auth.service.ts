import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {
    public isLoggedIn$: BehaviorSubject<boolean>;

    constructor() {
        const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
        this.isLoggedIn$ = new BehaviorSubject(isLoggedIn);
    }

    getAuthStatus() {
        if (localStorage.getItem('loggedIn') === 'true') {
            
            return true;
        } else return false;
    }

    login() {
        // logic
        localStorage.setItem('loggedIn', 'true');
        this.isLoggedIn$.next(true);
    }

    logout() {
        // logic
        localStorage.setItem('loggedIn', 'false');
        this.isLoggedIn$.next(false);
    }
}