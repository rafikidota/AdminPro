import { Component, OnInit } from '@angular/core';
import sweetalert from 'sweetalert2';

import { User } from 'src/app/models/user.model';
import { UploadService } from 'src/app/services/upload.service';
import { ImageModalService } from '../../services/image-modal.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html'
})
export class ImageModalComponent implements OnInit {

  public image!: File;
  public imageTemp: any = null;

  constructor(
    public ims: ImageModalService,
    public us: UploadService
  ) { }

  ngOnInit(): void {

  }

  closeModal() {
    this.imageTemp = null;
    this.ims.closeModal();
  }

  changeImage(event: any) {
    const file = event.target?.files[0];
    this.image = file;
    if (!file) {
      return this.imageTemp = null;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imageTemp = reader.result;
    }
    return;
  }

  uploadImage() {

    const id = this.ims.id;
    const collection = this.ims.collection;

    if(!this.image){
     return sweetalert.fire('Error','Seleccione una imagen', 'error');
    }

    return this.us
      .updateImage(this.image, collection, id)
      .subscribe({
        next: (res) => {
          if (res.ok === true) {
            sweetalert.fire('Guardado', 'Foto de perfil actualizada correctamente', 'success');
            this.ims.newImage.emit(res.filename!);
            this.closeModal();
          }
        },
        error: (err) => {
          if (err.status === 0) {
            sweetalert.fire('Error', 'No se ha podido establecer una conexión con el servidor', 'error');
          } else {
            sweetalert.fire('Error', err.error.msg, 'error');
          }
        }
      });
  }

}
