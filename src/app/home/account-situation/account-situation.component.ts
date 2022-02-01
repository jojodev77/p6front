import { Component, OnInit } from '@angular/core';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
@Component({
  selector: 'app-account-situation',
  templateUrl: './account-situation.component.html',
  styleUrls: ['./account-situation.component.scss']
})
export class AccountSituationComponent implements OnInit {

  constructor(private oauthService: OAuthService) { }

  ngOnInit() {
   this.getParamsObjectFromHash();
  }
  getParamsObjectFromHash() {
    const hash = window.location.hash ? window.location.hash.split('#') : [];
    let toBeReturned = {};
    if (hash.length && hash[1].split('&').length) {
      toBeReturned = hash[1].split('&').reduce((acc, x) => {
        const hello = x.split('=');
        if (hello.length === 2) acc[hello[0]] = hello[1];
          return acc;
      }, {});
    }
    console.log(Object.keys(toBeReturned).length ? toBeReturned : null)
    return Object.keys(toBeReturned).length ? toBeReturned : null;
  }
}
