import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { authentificationService } from './_services';
import { User } from './_models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        public router: Router,
        public authentificationService: authentificationService
    ) {
        this.redirectUser();
    }

    logout() {
        this.authentificationService.logout();
        this.router.navigate(['/login']);
    }

    async redirectUser() {
        const token = localStorage.getItem("token");
    
        if (token) {
            this.authentificationService.userLogged = true;
            this.router.navigate(["/home"]);
        } else {
          this.authentificationService.userLogged = false;
          this.router.navigate(["/login"]);
        }
      }
}