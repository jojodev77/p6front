import { NgModule,  CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { CashTransfertComponent } from './cash-transfert/cash-transfert.component';
import { AccountSituationComponent } from './account-situation/account-situation.component';
import { HomeRoutingModule } from './home.routing.module';
import { SharedModule } from '../shared/shared.module';
import { HomeServiceService } from './services/home-service.service';



@NgModule({
  declarations: [HomeComponent, HistoryComponent, CashTransfertComponent, AccountSituationComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [HomeServiceService]
})
export class HomeModule { }
