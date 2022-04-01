import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup: any;
  username: string = '';
  password: string = '';
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.username = history.state.username;
    this.password = history.state.password;

    this.createForm();
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });

    if (this.username) {
      this.formGroup.get('username').setValue(this.username);
    }

    if (this.password) {
      this.formGroup.get('password').setValue(this.password);
    }
  }

  onSubmit(value: any) {
    console.log(value);
  }

  createForm() {
    let usernameregex: RegExp = /[a-zA-Z][a-zA-Z0-9-_]{4,32}/;
    let passwordregex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    this.formGroup = this.formBuilder.group({
      username: [
        null,
        [Validators.required, Validators.pattern(usernameregex)],
      ],
      password: [
        null,
        [Validators.required, Validators.pattern(passwordregex)],
      ],
    });
  }

  getErrorUsername() {}

  getErrorPassword() {}
}
