import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninRequest } from '../models/signinRequest';
import { SigninResponse } from '../models/signinResponse';
import { SigninFormService } from '../services/signin-form.service';
import { SigninService } from '../services/signin.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthConfig } from 'angular-oauth2-oidc';
import { JwksValidationHandler } from 'angular-oauth2-oidc-jwks';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin + '/home',
  clientId: "1097570770416-34c3a8sc86sej5hlg40ghu15rsrjajdc.apps.googleusercontent.com",
  responseType: 'id_token token',
  scope: 'openid email profile',
  showDebugInformation: true,
  requireHttps: false,
  disablePKCE: true,
  strictDiscoveryDocumentValidation: false
};
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {


  constructor(private signinFormService: SigninFormService, private signinService: SigninService, private router: Router,
    private oauthService: OAuthService,  private socialAuthService: SocialAuthService) { }
  signinForm: FormGroup;
  user: SigninRequest;
  userResponse: any;
  signinResponse: SigninResponse;
  sr: SigninResponse;

  ngOnInit(): void {
    this.signinForm = this.signinFormService.buildForm();
    this.signinForm.get('email').setValue('j.d@g.com');
    this.signinForm.get('password').setValue('Jonathan77@');
  }

  signin() {
    let resp: any = {
      token: '',
      email: ''
    }
    this.user = {
      email: this.signinForm.get('email').value,
      password: this.signinForm.get('password').value
    } as any;
    this.signinService.saveUserInSession(this.user);
    this.signinService.signin(this.user).subscribe(
      (data: any) => {
        resp.token = data.token,
        resp.email = data.email,
        console.log(resp)
  
      }
    );


  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID) .then(response => {
     let user = {
        email: response.email,
        token: response.authToken
      } as any;

      this.signinService.userSession.next(user);
      this.signinService.saveUserInSession(user);
      if (user.token !== null) {
        this.router.navigate(['/home'])
      }
      console.log(this.user)

      console.log(response);
  });
  }


  

}
