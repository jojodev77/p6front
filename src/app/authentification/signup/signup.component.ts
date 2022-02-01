import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CreateUser } from '../models/createUser';
import { UserAdress } from '../models/userAdress';
import { UserPersonnal } from '../models/userPersonnal';
import { UserPersonnalConnexion } from '../models/userPersonnalConnexion';
import { SignupFormService } from '../services/signup-form.service';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private signupFormService: SignupFormService, private signupService: SignupService) { }

  signupForm: FormGroup;
  userAddress: UserAdress;
  userPersonnalConnexion: UserPersonnalConnexion;
  userPersonnal: UserPersonnal;
  createUser: CreateUser;


  ngOnInit(): void {
    this.signupForm = this.signupFormService.buildForm();
  }

  createUserForm() {
  let creatUser = {
    firstName: this.signupForm.get('firstName').value,
    lastName: this.signupForm.get('lastName').value,
    phone_number: this.signupForm.get('phoneNumber').value,
      "user_address": {
        city: this.signupForm.get('city').value,
        state: this.signupForm.get('state').value,
        street: this.signupForm.get('street').value,
        postal_number: this.signupForm.get('postal_number').value
      },
      "user_personnal_connexion": {
        email: this.signupForm.get('email').value,
        userName: this.signupForm.get('userName').value,
        password: this.signupForm.get('password').value,
        roles: ["ROLE_CLIENT"]
    }
  }
    
  
    console.log(creatUser)
    this.signupService.signup(creatUser).subscribe(
      (data: any) => {
        console.log(data)
      }
    )
  }



}
