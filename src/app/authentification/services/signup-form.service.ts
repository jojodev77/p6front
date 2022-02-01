import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SignupFormService {
  constructor(private formBuilder: FormBuilder) { }

  buildForm(): FormGroup {
    return this.formBuilder.group(
      {
        /* firstName */
        firstName: new FormControl(
          '',
          {
            validators: [
              Validators.required
            ],
            updateOn: 'change'
          }
        ),
        

        /* PASSWORD */
        lastName: new FormControl(
          '',
          {
            validators: [
              Validators.required
            ],
            updateOn: 'change'
          }
        ),
        phoneNumber: new FormControl(
          '',
          {
            validators: [
              Validators.required
            ],
            updateOn: 'change'
          }
        ),
        street: new FormControl(
          '',
          {
            validators: [
              Validators.required
            ],
            updateOn: 'change'
          }
        ),
        postal_number: new FormControl(
          '',
          {
            validators: [
              Validators.required
            ],
            updateOn: 'change'
          }
        ),
        city: new FormControl(
          '',
          {
            validators: [
              Validators.required
            ],
            updateOn: 'change'
          }
        ),
        state: new FormControl(
          '',
          {
            validators: [
              Validators.required
            ],
            updateOn: 'change'
          }
        ),
        userName: new FormControl(
          '',
          {
            validators: [
              Validators.required
            ],
            updateOn: 'change'
          }
        ),
        email: new FormControl(
          '',
          {
            validators: [
              Validators.required
            ],
            updateOn: 'change'
          }
        ),
        password: new FormControl(
          '',
          {
            validators: [
              Validators.required
            ],
            updateOn: 'change'
          }
        ),
        roles: new FormControl(
          '',
          {
            validators: [
              Validators.required
            ],
            updateOn: 'change'
          }
        ),
      }
    );
  }
}
