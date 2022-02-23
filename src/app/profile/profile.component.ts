import { Component, OnInit } from '@angular/core';
import { Us } from '../app.component';
import { User } from '../home/home.component';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.user = JSON.parse(JSON.stringify(this.token.getUser()));
   
   

  }

}
