import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  public user: User;

  constructor(
    private as: AuthService,
    private router: Router
  ) {
    this.user = as.user;
  }

  ngOnInit(): void { }

  logout() {
    this.as.logout();
  }

  search(query: string) {
    if (query.trim().length === 0) {
      return this.router.navigateByUrl(`/dashboard`);
    }
    return this.router.navigateByUrl(`/dashboard/search/${query}`);
  }

}
