import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu.interface';
import { SidebarService } from '../../services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {

  menuItems: Menu[] = [];
  constructor(
    private ss: SidebarService
  ) {
    this.menuItems = ss.menuItems;
  }

  ngOnInit(): void {
  }

}
