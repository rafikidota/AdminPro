import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu.interface';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  public user: User;
  constructor(
    private as: AuthService,
    public ss: SidebarService
  ) {
    this.user = as.user;
  }

  ngOnInit(): void { }

  logout() {
    this.as.logout();
  }
}
