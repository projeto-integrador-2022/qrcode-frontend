import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  username: string = '';
  constructor() { }

  ngOnInit(): void {
    
    this.username = history.state.username;
    console.log(this.username);
    
  }

}
