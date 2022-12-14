import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import sweetalert from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted = false;
  email = localStorage.getItem('email');
  public loginForm = this.fb.group({
    email: [this.email || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    remember_me: [false, []],
  });



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    document.title = `AdminPro - Login`;
    const email_length = this.email?.length || 0;
    if (email_length! > 0) {
      this.loginForm.reset({
        email: this.email || '',
        remember_me: true
      });
    }
    if (localStorage.getItem('logout')==='logout') {
      localStorage.removeItem('logout');
      location.reload();
    }
  }

  login() {
    this.submitted = true;
    if (this.hasErrors()) {
      this.showSweetAlert();
    } else {
      const { email, password } = this.loginForm.value;
      this.auth.login(email!, password!).subscribe({
        next: (res) => {
          if (res.ok === true) {
            this.router.navigateByUrl('/dashboard');
            this.saveLocalStorage(res.token!);
            localStorage.setItem('menu', JSON.stringify(res.menu!));
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

  hasErrors() {
    if (this.loginForm.invalid) {
      return true;
    }
    return false;
  }

  showSweetAlert() {
    sweetalert.fire('Error', 'Credenciales incorrectas', 'error');
  }

  saveLocalStorage(token: string) {
    localStorage.setItem('token', token);
    this.rememberMe();
  }

  rememberMe() {
    const email = this.loginForm.get('email')?.value;
    if (this.loginForm.get('remember_me')?.value) {
      localStorage.setItem('email', email!);
    } else {
      localStorage.removeItem('email');
    }
  }
 
}
