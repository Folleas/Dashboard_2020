import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register/register.component';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
    GoogleLoginProvider,
    FacebookLoginProvider
} from 'angularx-social-login';;
import { OauthserviceComponent } from './oauthservice/oauthservice.component'

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        appRoutingModule,
        SocialLoginModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        OauthserviceComponent,
        RegisterComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider,
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider(
                            '215187822047-8k2fp19m5777f9qc94dqlrpb3jlvbasm.apps.googleusercontent.com'
                        )
                    }/*,
                    {
                        id: FacebookLoginProvider.PROVIDER_ID,
                        provider: new FacebookLoginProvider('clientId')
                    }*/
                ]
            } as SocialAuthServiceConfig,
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }