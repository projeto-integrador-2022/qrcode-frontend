import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email : string = '';
  password: string = '';
  constructor() { }

  ngOnInit(): void {
    this.email = history.state.email;
    this.password = history.state.password;
    console.log(this.email, ' ', this.password);
    

  }

}
