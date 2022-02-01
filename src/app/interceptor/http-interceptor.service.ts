import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { SigninService } from '../authentification/services/signin.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor( private signinService: SigninService,) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.signinService.userSession
        .pipe(
            take(1),
            tap(n => n.token),
            map(
                (tok: any) => {
                    alert(tok.token)
                    if (tok.token !== null) {
                        return tok.token;
                    } else {
                        /* Dans le cas du premier appel REST qui récupère le contexte utilisateur */
                        return '';
                    }
                }
            ),
            switchMap(
                (token: string) => {
                    if (token === '') {
                        /* Dans le cas du premier appel REST qui récupère le contexte utilisateur */
                        return next.handle(request);
                    } else {
                        /* Dans le cas où le contexte utilisateur existe déjà,
                         * il faut envoyer l'authentification de  l'utilisateur à chaque appel REST
                        */
                        const newReq = request.clone(
                            { headers: request.headers.append('Authorization', 'Bearer ' + token) }
                        );
                        return next.handle(newReq);
                    }

                }
            )
        );
}
}
