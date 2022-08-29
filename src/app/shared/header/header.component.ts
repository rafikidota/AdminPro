import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user.models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  public user: User;

  constructor(
    private as: AuthService
  ) { 
    this.user = as.user;
  }

  ngOnInit(): void { }

  logout(){
    this.as.logout();
  }

}
