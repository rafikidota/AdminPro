import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { EditUserModalService } from '../../services/edit-user-modal.service';
import { Subscription } from 'rxjs';
import sweetalert from 'sweetalert2';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html'
})
export class EditUserModalComponent implements OnInit, OnDestroy {

  public hide: boolean = true;
  public editUserForm!: FormGroup;
  public user!: User;
  public userSubs!: Subscription;
  public google = false;

  constructor(
    private fb: FormBuilder,
    public eums: EditUserModalService,
    private us: UserService
  ) {

  }
  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubs = this.eums.userEE.subscribe(user => {
      this.user = user;
      this.google = user.google!;
      this.editUserForm = this.fb.group({
        name: [this.user.name, [Validators.required]],
        email: [this.user.email, [Validators.required, Validators.email]],
      });
    });
    this.editUserForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  closeModal() {
    this.eums.closeModal();
  }
  updateUser() {
    const name = this.editUserForm.get('name')?.value;
    const email = this.editUserForm.get('email')?.value;
    this.user.name = name;
    this.user.email = email;
    this.us.update(this.user).subscribe({
      next: (res) => {
        if (res.ok === true) {
          this.eums.userUpdatedEE.emit(true);
          sweetalert.fire('Guardado', 'Usuario actualizado correctamente', 'success');
        }
      },
      error: (err) => {
        if (err.status === 0) {
          sweetalert.fire('Error', 'No se ha podido establecer una conexión con el servidor', 'error');
        } else {
          sweetalert.fire('Error', err.error.msg, 'error');
        }
        this.eums.userUpdatedEE.emit(false);
      }
    });
    this.eums.closeModal();
  }

}
