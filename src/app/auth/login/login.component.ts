import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    document.title = `AdminPro - Login`;
  }
  
  login(){
    this.router.navigateByUrl('/');
  }

}
