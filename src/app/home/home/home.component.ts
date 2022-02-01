import { Component, OnInit } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { Subject } from 'rxjs';
import { SigninService } from 'src/app/authentification/services/signin.service';
import { HomeServiceService } from '../services/home-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private oauthService: OAuthService, private signinService: SigninService,
    private homeService: HomeServiceService) { }

    email: string;

  ngOnInit() {
    let email;
   this.signinService.userSession.subscribe(
     (data:any) => {console.log(data)}
   )
    this.homeService.getUserInformations(this.email).subscribe(
      (data: any) => {email = data}
   )
  }
  // getParamsObjectFromHash() {
  //   const hash = window.location.hash ? window.location.hash.split('#') : [];
  //   let toBeReturned = {};
  //   if (hash.length && hash[1].split('&').length) {
  //     toBeReturned = hash[1].split('&').reduce((acc, x) => {
  //       const hello = x.split('=');
  //       if (hello.length === 2) acc[hello[0]] = hello[1];
  //         return acc;
  //     }, {});
  //   }
  //   return Object.keys(toBeReturned).length ? toBeReturned : null;
  // }

}
