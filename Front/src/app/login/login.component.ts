import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { authentificationService } from 'src/app/_services';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        public router: Router,
        public authentificationService: authentificationService
    ) { 
        // redirect to home if already logged in
        if (this.authentificationService.userLogged) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authentificationService.login(this.f.username.value, this.f.password.value)
            .subscribe(
                data => {
                    if (data.data.token) {
                        localStorage.setItem("token", data.data.token);
                        this.authentificationService.userLogged = true;
                        this.router.navigate([""]);
                    }
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }
}
