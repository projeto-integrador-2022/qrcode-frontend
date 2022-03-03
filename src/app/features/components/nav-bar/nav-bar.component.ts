import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public isMenuCollapsed = true;
  public imageUrl = '../../../assets/images/qr-code.png'

  constructor() { }

  ngOnInit(): void {
  }

}
