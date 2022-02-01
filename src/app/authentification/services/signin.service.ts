import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SigninRequest } from '../models/signinRequest';
import { SigninResponse } from '../models/signinResponse';
import {catchError} from 'rxjs/operators'; 
import { AuthConfig } from 'angular-oauth2-oidc';
import { OAuthService, JwksValidationHandler } from 'angular-oauth2-oidc';
import { stringify } from '@angular/compiler/src/util';


@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient,  private oauthService: OAuthService) { }

  env = environment;
  userSession = new Subject<any>();

  authConfig: AuthConfig = {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin + '/home',
    clientId: "1097570770416-34c3a8sc86sej5hlg40ghu15rsrjajdc.apps.googleusercontent.com",
    scope: 'openid profile email',
    strictDiscoveryDocumentValidation: false
  };

  signin(user: SigninRequest): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post<any>(this.env.signinWithEmail, user, { headers: headers }).pipe(
      catchError(this.handleError)
  );
}

signinByGoogle() {
//   let headers = new HttpHeaders();
//   headers = headers.append('Content-Type', 'application/json');
//   return this.http.post<any>(this.env.signinWithGoogle, { headers: headers }).pipe(
//     catchError(this.handleError)
// );
this.oauthService.configure(this.authConfig);
this.oauthService.tokenValidationHandler = new JwksValidationHandler();
this.oauthService.loadDiscoveryDocumentAndTryLogin();
}

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
       switch (error.status) {
         case 401:
          errorMessage = `Erreur: ${error.status}\nMessage: Authentification incorrecte`;
           alert(errorMessage)
           break;
           case 302:
            window.location.href = 'http://localhost:8083/login/oauth2/code/google';
             break;
             case 405:
              window.location.href = 'http://localhost:8083/login/oauth2/code/google';
               break;
           case 403:
            errorMessage = `Erreur: ${error.status}\nMessage: Accés refusé`;
             alert(errorMessage)
             break;
             case 409:
              errorMessage = `Erreur: ${error.status}\nMessage: Nom et/ou émail déja existant !`;
               alert(errorMessage)
               break;
               case 428:
              errorMessage = `Erreur: ${error.status}\nMessage: Nom/mot-de-passe incorrect`;
               alert(errorMessage)
               break;
             case 500:
            errorMessage = `Erreur: ${error.status}\nMessage: Erreur du serveur.`;
             alert(errorMessage)
             break;
       
         default:
           break;
       }
          
    }
  
    return throwError(errorMessage);
  }

  saveUserInSession(user: any) {
    console.log(user)
    this.userSession.next(user);
    sessionStorage.setItem("user", JSON.stringify(user));
  }

getToken() {
  let token: string;
  let us: any = sessionStorage.getItem(("user"));
console.log(JSON.parse(us).token)
token = JSON.parse(us).token;
return token;
}
}

