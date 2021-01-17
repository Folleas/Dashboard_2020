import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { User } from 'src/app/_models';

@Injectable({ providedIn: 'root' })
export class authentificationService {
    userLogged: boolean = false;
    constructor(private http: HttpClient) {
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/user/login`, { email, password })
    }

    register(name: string, email: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/api/user/register`, { name, email, password })
    }

    logout() {
        localStorage.removeItem("token");
        this.userLogged = false;
    }
}