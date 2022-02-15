import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
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
}



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  content: string;
  buddy: any;

  constructor(private userService: UserService, private token: TokenStorageService) { }

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
  buddyControl = new FormControl();
  amountControl = new FormControl();



  ngOnInit(): void {
this.refreshData();
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
      userGetter: this.buddyControl.value,
      userSetter: this.user.userAccountInformations?.accountReferenceTransaction
    };
    buddy.userGetter = this.buddyControl.value;
    buddy.userSetter = this.user.userAccountInformations?.accountReferenceTransaction;
    let amount = this.amountControl.value;
this.userService.startTransaction(buddy, amount).subscribe(
  (data: any) => {console.log(data)}
);
this.refreshData();
  }

  private refreshData() {
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
    )
    this.userService.getCurrentInfos().subscribe(
      (data: any) => { this.user = data, console.log(data) }
    );

    this.user = this.currentUser = this.token.getUser();
    this.valueListUserReferenceAccount = this.myControl.value;
      console.log(this.user)

      this.userService.getListBuddy(this.user.id).subscribe(
        (data: any) => {this.dataSource = data, console.log(this.dataSource)

        }
      );
      window.location.origin;
  }

}
