import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppConstants } from '../common/app.constants';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders(
    {  'Access-Control-Allow-Origin': '**',
    'Access-Control-Allow-Headers': '**',
    'Access-Control-Allow-Methods': 'POST, GET, OPTION, DELETE, PUT',
    'Content-Type': 'application/json' }
    
    )
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(credentials): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'signin', {
      email: credentials.username,
      password: credentials.password
    }, httpOptions).pipe(
      map(res => <any[]>res),
      catchError(this.handleError)
    );
  }

  register(user): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'signup', {
      displayName: user.displayName,
      email: user.email,
      password: user.password,
      matchingPassword: user.matchingPassword,
      socialProvider: 'LOCAL'
    }, httpOptions).pipe(
      map(res => <any[]>res),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
        return throwError( alert(errorMessage))
    } else {
       switch (error.status) {
         case 401:
          errorMessage = `Erreur: ${error.status}\nMessage: incorrect authentication`;
          return throwError( alert(errorMessage))
           break;
             case 500:
            errorMessage = `Erreur: ${error.status}\nMessage: system error.`;
            return throwError( alert(errorMessage))
             break;
             case 400:
            errorMessage = `Erreur: ${error.status}\nMessage: request to server failed`;
            return throwError(  alert(errorMessage))
             break;
             case 200:
              errorMessage = `successful operation`;
              return throwError(  alert(errorMessage))
               break;
       
         default:
           break;
       }
  
      }
    }
}
