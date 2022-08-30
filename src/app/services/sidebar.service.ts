import { Injectable } from '@angular/core';
import { Menu } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menuItems: Menu[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Main', url: '/' },
        { title: 'Charts', url: 'charts' },
        { title: 'ProgressBPar', url: 'progress' },
        { title: 'Promesas', url: 'promise' },
        { title: 'RxJs', url: 'rxjs' },
      ]
    },
    {
      title: 'Managements',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Users', url: '/users' },
        { title: 'Hospitals', url: '/hospitals' },
        { title: 'Doctors', url: '/doctors' },
      ]
    }
  ];

  get menu(){
    return this.menuItems;
  }
  constructor() { }
}
