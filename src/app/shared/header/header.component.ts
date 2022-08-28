import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
    private as: AuthService
  ) { }

  ngOnInit(): void { }

  logout(){
    this.as.logout();
  }

}
