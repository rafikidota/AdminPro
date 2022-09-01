import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import sweetalert from 'sweetalert2';

import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup;
  public user!: User;
  public image!: File;
  public imageTemp: any = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private uploadService: UploadService
  ) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.authService.user.name, [Validators.required]],
      email: [this.authService.user.email, [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      // confirm: ['', [Validators.required, Validators.minLength(6)]],
      // terms: [false, [Validators.requiredTrue]],
    });
  }

  save() {
    const name = this.profileForm.get('name')?.value;
    const email = this.profileForm.get('email')?.value;
    const user = this.authService.user;
    user.name = name;
    user.email = email;
    this.userService.update(user).subscribe({
      next: (res) => {
        if (res.ok === true) {
          this.authService.user = res.user!
          sweetalert.fire('Guardado', 'Usuario actualizado correctamente', 'success');
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
    this.uploadService
      .updateImage(this.image, 'users', this.user.id!)
      .subscribe({
        next: (res) => {
          if (res.ok === true) {
            this.user.img = res.filename!;
            sweetalert.fire('Guardado', 'Foto de perfil actualizada correctamente', 'success');
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
