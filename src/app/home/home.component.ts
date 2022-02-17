import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface ListUserRferenceTransaction {
  accountReferenceTransaction: string;
  displayName: string;
}

export interface AddBuddy {
  userGetter: string;
  userSetter: string;
  amount: number;
}

export interface AddCash {
  phoneNumber: string;
  userGetter: string;
  amount: number;
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  content: string;
  buddy: any;

  constructor(private userService: UserService, private token: TokenStorageService,
    private router: Router) { }

  displayedColumns: string[] = ['displayName', 'accountReferenceTransaction', 'transaction'];
  displayedColumnsHistory: string[] = ['displayName', 'date', 'soldAccount'];
  dataSource = new MatTableDataSource();
  dataSourceHistory = new MatTableDataSource();
  myControl = new FormControl();
  options: string[];
  filteredOptions: Observable<any[]>;
  currentUser: any;
  user: any;
  listUserReferenceAccount: ListUserRferenceTransaction[];
  valueListUserReferenceAccount: ListUserRferenceTransaction;
  form: any = {};
  value = 'Clear me';
  soldAccountForm = new FormGroup({
    amountCash: new FormControl(''),
    phoneNumber: new FormControl(''),
   
  });
  transactionForm = new FormGroup({
    amount : new FormControl(''),
    buddy : new FormControl('')
  });
  interval: any;
  listHistory: any;
  accountSituation: any;

  ngOnInit(): void {
    this.refreshData();
  //   this.interval = setInterval(() => { 
  //     this.getListHistory(); 
  // }, 15000);

  setTimeout(() => {
    this.getListHistory(); 
  }, 1000);
  }

  ngOnDestroy() {
    this.userService.getListUserReferenceTransaction().subscribe().unsubscribe();
    this.userService.getPublicContent().subscribe().unsubscribe();
  }

  getValue() {
    this.valueListUserReferenceAccount = this.myControl.value;
  }
  displayFn(country: ListUserRferenceTransaction): string {
    return country && country.displayName ? country.displayName : '';
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }


  addBuddy(buddy: ListUserRferenceTransaction) {
    this.userService.addBuddy(buddy.accountReferenceTransaction, this.user.userAccountInformations?.accountReferenceTransaction).subscribe(
      (data: any) => { console.log(data) }
    );
    this.refreshData();
  }


  actionTransaction() {
    let buddy: AddBuddy = {
      userGetter: this.transactionForm.get('buddy').value,
      userSetter: this.user.userAccountInformations?.accountReferenceTransaction,
      amount:  this.transactionForm.get('amount').value
    };
    // buddy.userGetter = this.buddyControl.value;
    // buddy.userSetter = this.user.userAccountInformations?.accountReferenceTransaction;
    let amount = this.transactionForm.get('amount').value;
    this.userService.startTransaction(buddy).subscribe(
      (data: any) => { console.log(data) }
    );
    this.userService.getAccountSituation(buddy).subscribe(
      (data: any) => {this.accountSituation = data}
    );
  }

  private refreshData() {
    this.refreshPage();
    this.token.getUser()
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
        console.log(data)
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );


    this.userService.getListUserReferenceTransaction().subscribe(
      (data: any) => { this.listUserReferenceAccount = data, console.log(this.listUserReferenceAccount) }
    ).unsubscribe
    // this.userService.getCurrentInfos().subscribe(
    //   (data: any) => { this.user = data, console.log(data) }
    // );

    this.user = this.currentUser = this.token.getUser();
    this.valueListUserReferenceAccount = this.myControl.value;
    console.log(this.user)

    this.userService.getListBuddy(this.user.id).subscribe(
      (data: any) => {
        this.dataSource = data, console.log(this.dataSource)

      }
    );
    let bud: AddBuddy = {
      userGetter: null,
      userSetter: this.user.userAccountInformations.accountReferenceTransaction,
      amount: null
    }
    this.userService.getAccountSituation(bud).subscribe(
      (data: any) => {this.accountSituation = data}
    );
 
  }

  getListHistory() {
    let bud: AddBuddy = {
      userGetter: null,
      userSetter: this.user.userAccountInformations.accountReferenceTransaction,
      amount: null
    }
  this.userService.getListHistory(bud).subscribe(
    (data: any) => {this.dataSourceHistory = data, console.log(data)}
  );
  }

  refreshPage() {
    this.userService.getListUserReferenceTransaction().subscribe().unsubscribe();
    this.userService.getPublicContent().subscribe().unsubscribe();
    this.router.navigate([""]);
  }

  addCash() {
    let cash: AddCash = {
    amount:  this.soldAccountForm.get('amountCash').value,
    phoneNumber: this.soldAccountForm.get('phoneNumber').value,
    userGetter: this.user.userAccountInformations?.accountReferenceTransaction
    }
    this.userService.addCash(cash).subscribe(
      (data: any) => {console.log(data)}
    );
    // this.userService.getAccountSituation(buddy).subscribe(
    //   (data: any) => {this.accountSituation = data}
    // );
  }


}
