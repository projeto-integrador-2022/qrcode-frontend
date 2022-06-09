import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/shared/models/account';
import { AccountService } from 'src/app/shared/services/account.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import SENTENCES from '../../../../assets/lib/sentences.json';

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
  isError!: boolean;
  LOGIN_SENTENCES: any;
  token: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private accountService: AccountService, public authService: AuthService) {
    this.LOGIN_SENTENCES = SENTENCES.LOGIN;
  }

  ngOnInit(): void {

    this.username = history.state.username;
    this.password = history.state.password;

    this.createForm();

    if (this.username) {
      this.formGroup.get('username').setValue(this.username);
    }

    if (this.password) {
      this.formGroup.get('password').setValue(this.password);
    }
  }

  onSubmit(value: any) {
    let loginParams = {username: value.username, password: value.password};
    this.token = this.accountService.login(loginParams).subscribe((data: any) => {
      this.authService.setToken(data.jwttoken);
      this.authService.login();
      this.router.navigate(['/admin-page']);
    })
  }


  createForm() {
    this.formGroup = this.formBuilder.group({
      username: [
        null,
        [Validators.required],
      ],
      password: [
        null,
        [Validators.required],
      ],
    });
  }

  navigateToInnerPage() {
    this.router.navigate(['/landing-page']);
  }

  getErrorUsername() {
    return this.formGroup.get('username').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED : '';
  }

  getErrorNotValid() {
    return SENTENCES.FORM_ERROR[0].USERNAME_OR_PASSWORD_NOT_VALID;
  }
}
