import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public myForm = this.fb.group({
    name: ['David', [Validators.required]],
    email: ['test123@test.com', [Validators.required]],
    password: ['123456', [Validators.required]],
    confirm: ['123456', [Validators.required]],
    terms: [false, [Validators.required]],
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    document.title = `AdminPro - Register`;
  }
  register() {
    console.log(this.myForm.value);
  }
}
