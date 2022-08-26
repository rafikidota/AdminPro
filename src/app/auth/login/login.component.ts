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

  public loginForm = this.fb.group({
    email: ['dlesmes@nauta.cu', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required]],
    remember_me: [false, []],
  });

  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    document.title = `AdminPro - Login`;
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
            this.router.navigateByUrl('/');
          }
        },
        error: (err) => {
          sweetalert.fire('Error', err.error.msg, 'error');
        }
      });
    }
  }
  hasErrors(){
    return true;
  }
  showSweetAlert(){

  }

}
