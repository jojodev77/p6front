import { NgModule,  CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuhentificationRoutingModule } from './authentification.routing.module';

import { SharedModule } from '../shared/shared.module';
import { SigninService } from './services/signin.service';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SigninComponent, SignupComponent],
  imports: [
    CommonModule,
    AuhentificationRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [SigninService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AuthentificationModule { }
