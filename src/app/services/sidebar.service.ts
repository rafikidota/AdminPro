import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menuItems: Menu[] = [];
  // menuItems: Menu[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Main', url: '/' },
  //       { title: 'Charts', url: 'charts' },
  //       { title: 'ProgressBPar', url: 'progress' },
  //       { title: 'Promesas', url: 'promise' },
  //       { title: 'RxJs', url: 'rxjs' },
  //     ]
  //   },
  //   {
  //     title: 'Managements',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Users', url: 'users' },
  //       { title: 'Hospitals', url: 'hospitals' },
  //       { title: 'Doctors', url: 'doctors' },
  //     ]
  //   }
  // ];

  constructor(
    private router: Router,
  ) { }

  get menu() {
    return this.menuItems;
  }

  loadMenu() {
    this.menuItems = JSON.parse(localStorage.getItem('menu') || '');
    if (this.menuItems.length === 0) {
      this.router.navigateByUrl('/login');
    }
  }
}
