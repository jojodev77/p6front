import { NgModule,  CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { CashTransfertComponent } from './cash-transfert/cash-transfert.component';
import { AccountSituationComponent } from './account-situation/account-situation.component';
import { HomeRoutingModule } from './home.routing.module';



@NgModule({
  declarations: [HomeComponent, HistoryComponent, CashTransfertComponent, AccountSituationComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class HomeModule { }
