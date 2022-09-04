import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ImageModalService {

  private _hide: boolean = true;
  public collection!: 'users' | 'doctors' | 'hospitals';
  public id!: string;
  public img!: string;
  public newImage: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  get hideModal() {
    return this._hide;
  }

  openModal(
    collection: 'users' | 'doctors' | 'hospitals',
    id: string,
    img: string = 'no-image'
  ) {
    this._hide = false;
    this.collection = collection;
    this.id = id;
    if (img.includes('http' || 'https')) {
      this.img = img;
    }else{
      this.img = `${base_url}/upload/${collection}/${img}`;
    }
  }

  closeModal() {
    this._hide = true;
  }

}
