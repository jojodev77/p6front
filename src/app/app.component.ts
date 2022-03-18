import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './home/home.component';
import { TokenStorageService } from './_services/token-storage.service';

export interface Us {
  id: number;
  displayName:string;
  email: string;
  role: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: any;
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  user: User;
  constructor(private tokenStorageService: TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.user =  this.tokenStorageService.getUser();
    if (this.isLoggedIn) {
        if (this.user?.displayName) {
          this.user =  this.tokenStorageService.getUser();
          this.router.navigate(["/home"]);
          
        } else {
          this.user =  JSON.parse(this.tokenStorageService.getUser());
          this.router.navigate(["/home"]);
        }
        this.roles = this.user?.role;
        this.username = this.user.displayName;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}