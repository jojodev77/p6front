import { Injectable } from '@angular/core';
import { User } from '../home/home.component';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    if (token != null) {
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
  
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    if (user) {
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  
  }

  public getUser(): any {
    if (sessionStorage.getItem(USER_KEY)) {
      return JSON.parse(sessionStorage.getItem(USER_KEY));
    }
   
  }
}
