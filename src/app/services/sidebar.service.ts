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
      ]
    }
  ];

  get menu(){
    return this.menuItems;
  }
  constructor() { }
}
