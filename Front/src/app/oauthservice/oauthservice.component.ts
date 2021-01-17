import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-oauthservice',
  templateUrl: './oauthservice.component.html',
  styleUrls: ['./oauthservice.component.css']
})
export class OauthserviceComponent implements OnInit {

  constructor(private authService: SocialAuthService) { }
 
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
 
  signOut(): void {
    this.authService.signOut();
  }

  ngOnInit(): void {
  }

}
