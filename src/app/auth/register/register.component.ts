import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import sweetalert from 'sweetalert2';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.models';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirm: ['', [Validators.required, Validators.minLength(6)]],
    terms: [false, [Validators.requiredTrue]],
  });
  public alert = '';
  public submitted = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private us: UserService
  ) { }

  ngOnInit(): void {
    document.title = `AdminPro - Register`;
  }
  register() {
    this.submitted = true;
    this.comparePasswords('password', 'confirm');
    if (this.hasErrors()) {
      this.showSweetAlert();
    } else {
      const { name, email, password } = this.registerForm.value;
      const user = new User(name!, email!, password!);
      this.us.register(user).subscribe({
        next: (res) => {
          if (res.ok === true) {
            this.router.navigateByUrl('/');
          }
        },
        error: (err) => {
          sweetalert.fire('Error', err.error.msg, 'error');
        }
      });
    }
  }

  validate(fcn: string) {
    return (this.registerForm.get(fcn)?.invalid && this.submitted) ? true : false;
  }

  hasErrors() {
    this.alert = '';
    let hasError = false;
    const keys = ['name', 'email', 'password', 'confirm', 'terms']
    keys.forEach(key => {
      const invalid = this.validate(key);
      if (invalid && (this.alert === '')) {
        hasError = true;
        this.alert = key;
      }
    });
    // if (!hasError) {
    //   const password = this.myForm.get('password');
    //   const confirm = this.myForm.get('confirm');
    //   if (password != confirm) {
    //     this.alert = 'confirm';
    //     hasError = true;
    //   }
    // }
    return hasError;
  }

  showSweetAlert() {

    let error = '';
    switch (this.alert) {
      case 'name':
        error = 'El nombre es obligatorio.'
        break;
      case 'email':
        error = 'El email es obligatorio.'
        break;
      case 'password':
        error = 'Su contraseña debe tener 6 carácteres.'
        break;
      case 'confirm':
        error = 'Confirme correctamente su contraseña.'
        break;
      case 'terms':
        error = 'Debe de aceptar los términos de uso para continuar.'
        break;

      default:
        break;
    }
    sweetalert.fire('Error', error, 'error');
  }

  comparePasswords(password: string, confirm: string) {
    const passwordControl = this.registerForm.get(password);
    const confirmControl = this.registerForm.get(confirm);
    if (passwordControl?.value === confirmControl?.value) {
      confirmControl?.setErrors(null);
    } else {
      confirmControl?.setErrors({ notEquals: true });
    }
  }
}

