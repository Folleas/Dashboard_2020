import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService
    ) {
      // redirect to home if already logged in
      if (this.authenticationService.userLogged) {
        this.router.navigate(['/']);
      }
    }

    ngOnInit() {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
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
      this.authenticationService.register(this.f.username.value, this.f.email.value, this.f.password.value)
        .subscribe(
          data => {
            this.authenticationService.login(this.f.email.value, this.f.password.value)
            .subscribe(
                data => {
                    if (data.data.token) {
                        localStorage.setItem("token", data.data.token);
                        this.authenticationService.userLogged = true;
                        this.router.navigate([""]);
                    }
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
          },
          error => {
            this.error = error;
            this.loading = false;
          });
    }
}
