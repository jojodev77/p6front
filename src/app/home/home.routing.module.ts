import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSituationComponent } from './account-situation/account-situation.component';
import { CashTransfertComponent } from './cash-transfert/cash-transfert.component';



const routes: Routes = [
  { path: '', component: AccountSituationComponent},
  { path: 'account-home', component: AccountSituationComponent},
  { path: 'cash-transfert', component: CashTransfertComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }