import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CreateUser } from '../models/createUser';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }

  env = environment;

  signup(user: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post<any>(this.env.createUser, user, { headers: headers }).pipe(
      catchError(this.handleError)
  );
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
}
