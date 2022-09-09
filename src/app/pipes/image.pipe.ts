import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, collection: 'users' | 'doctors' | 'hospitals'): string {
    if (img?.includes('https' || 'http')) {
      return img;
    }
    if (img) {
      return `${base_url}/upload/${collection}/${img}`;
    } else {
      return `${base_url}/upload/${collection}/no-image`;
    }
  }

}
