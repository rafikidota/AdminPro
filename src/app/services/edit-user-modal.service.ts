import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class EditUserModalService {

  private _hide: boolean = true;
  public userEE: EventEmitter<User> = new EventEmitter<User>();
  public userUpdatedEE: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  constructor() { }

  get hideModal() {
    return this._hide;
  }

  openModal() {
    this._hide = false;
  }

  closeModal() {
    this._hide = true;
  }

}
