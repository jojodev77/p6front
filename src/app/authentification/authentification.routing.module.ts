import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: RegisterComponent},
  {
    path: 'home',
    loadChildren: () => import('../home/home.module').then(m => m.HomeModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    OAuthModule.forRoot()],
  exports: [RouterModule]
})
export class AuhentificationRoutingModule { }
