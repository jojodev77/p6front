import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AppConstants } from '../common/app.constants';
import { AddBuddy, AddCash } from '../home/home.component';
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
		  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
		};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'admin', { responseType: 'text' });
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'user/me', { responseType: 'text' });
  }

  getCurrentInfos(): Observable<any> {
    return this.http.get(AppConstants.API_URL + 'user/infos', { responseType: 'text' });
  }

  getListUserReferenceTransaction(): Observable<any> {
    return this.http.get(AppConstants.LIST_REFERENCE_TRANSACTION, httpOptions);
  }

  addBuddy(userGetter: string, userSetter: string): Observable<any> {
    
    let buddy: AddBuddy = {
      userGetter: userGetter,
      userSetter: userSetter,
      amount: null
    }
    return this.http.post(AppConstants.ADD_BUDDY,buddy, httpOptions);
  }

  getListBuddy(id: number) {
    return this.http.post(AppConstants.GET_LIST_BUDDY,id, httpOptions);
  }

  startTransaction(buddys: AddBuddy):Observable<any> {
    let buddy: any = {
      userGetter: buddys.userGetter,
      userSetter: buddys.userSetter,
      amount: buddys.amount
    }
    return this.http.post(AppConstants.START_TRANSACTION,buddy, httpOptions).pipe(
      map(res => <any[]>res),
      catchError(this.handleError)
    );
  }

  addCash(cash: AddCash) {
  return this.http.post(AppConstants.ADD_CASH, cash, httpOptions).pipe(
    map(res => <any[]>res),
    catchError(this.handleError)
  );
}

getListHistory(buddy: AddBuddy) {
  return this.http.post(AppConstants.GET_LIST_HISTORY, buddy, httpOptions);
}


getAccountSituation(buddy: AddBuddy) {
  return this.http.post(AppConstants.GET_ACCOUNT_SITUATION, buddy, httpOptions);
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
