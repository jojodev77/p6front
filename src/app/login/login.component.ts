import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { AppConstants } from '../common/app.constants';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  googleURL = AppConstants.GOOGLE_AUTH_URL;
  facebookURL = AppConstants.FACEBOOK_AUTH_URL;
  githubURL = AppConstants.GITHUB_AUTH_URL;
  linkedinURL = AppConstants.LINKEDIN_AUTH_URL;
  displayName: string;
  user: any;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private route: ActivatedRoute, private userService: UserService) {}

  ngOnInit(): void {
    
	const token: string = this.route.snapshot.queryParamMap.get('token');
	const error: string = this.route.snapshot.queryParamMap.get('error');
  console.log(token)
  	if (this.tokenStorage.getToken()) {
      console.log(this.tokenStorage.getToken())
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    }
  	else if(token){
  		this.tokenStorage.saveToken(token);
  		this.userService.getCurrentUser().subscribe(
  		      data => {
  		        this.login(data);
  		      },
  		      err => {
  		        this.errorMessage = err.error.message;
  		        this.isLoginFailed = true;
  		      }
  		  );
  	}
  	else if(error){
  		this.errorMessage = error;
	    this.isLoginFailed = true;
  	}
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        console.log(data)
        this.tokenStorage.saveToken(data.jwt);
        this.displayName = data.displayName;
        this.user = data;
        console.log(this.user)
        this.login(this.user);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  login(user): void {
	this.tokenStorage.saveUser(user);
	this.isLoginFailed = false;
	this.isLoggedIn = true;
	this.currentUser = this.tokenStorage.getUser();
    window.location.reload();
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
    return Object.keys(toBeReturned).length ? toBeReturned : null;
  }
}
