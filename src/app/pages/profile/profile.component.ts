import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  public profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private us: UserService,
    private as: AuthService
  ) { }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.as.user.name, [Validators.required]],
      email: [this.as.user.email, [Validators.required, Validators.email]],
      // password: ['', [Validators.required, Validators.minLength(6)]],
      // confirm: ['', [Validators.required, Validators.minLength(6)]],
      // terms: [false, [Validators.requiredTrue]],
    });
  }

  save() {
    const name = this.profileForm.get('name')?.value;
    const email = this.profileForm.get('email')?.value;
    const user = this.as.user;
    user.name = name;
    user.email = email;
    this.us.update(user).subscribe( res =>{
      this.as.user = res.user!
    });
  }

}
