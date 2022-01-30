import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SigninFormService {

  constructor(private formBuilder: FormBuilder) { }

  buildForm(): FormGroup {
    return this.formBuilder.group(
      {
        /* USERNAME */
        email: new FormControl(
          '',
          {
            validators: [
              Validators.required
            ],
            updateOn: 'change'
          }
        ),

        /* PASSWORD */
        password: new FormControl(
          '',
          {
            validators: [
              Validators.required
            ],
            updateOn: 'change'
          }
        )
      }
    );
  }
}
