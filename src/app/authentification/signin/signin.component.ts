import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninRequest } from '../models/signinRequest';
import { SigninResponse } from '../models/signinResponse';
import { SigninFormService } from '../services/signin-form.service';
import { SigninService } from '../services/signin.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private signinFormService: SigninFormService, private signinService: SigninService, private router: Router) { }
 signinForm: FormGroup;
 user: SigninRequest;
 userResponse: any;
 signinResponse: SigninResponse;
 sr: SigninResponse;
  ngOnInit(): void {
    this.signinForm = this.signinFormService.buildForm();
    this.signinForm.get('email').setValue('j.d@g.com');
    this.signinForm.get('password').setValue('Jonathan77@');
  }

  signin() {
    let  resp: any = {
      token: '',
      email: ''
    }
  this.user = {
      email: this.signinForm.get('email').value,
      password: this.signinForm.get('password').value
    } as any;
    console.log(this.user);
    this.signinService.signin(this.user).subscribe(
      (data: any) => {
         resp.token = data.token,
          resp.email = data.email
       }
    );
   
  //  window.location.href ="";

  if (resp) {
    this.buildUser(resp);
  }
 
  }

  signinByGoogle() {
    let  resp: any = {
      token: '',
      email: ''
    }
      this.signinService.signinByGoogle().subscribe(
        (data: any) => {
          resp.token = data.token,
           resp.email = data.email
        }
     );
    
     window.location.href ="http://localhost:8083/signinByGoogle";
 
   if (resp) {
     this.buildUser(resp);
   }
    }

    buildUser(user : any) {
      sessionStorage.setItem("user", JSON.stringify(user));
      const us = JSON.parse(sessionStorage.getItem("user")); 
        this.router.navigate(['/home'])
      
    }

}
