import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthGuard } from 'src/app/shared/services/auth.guard';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  username: string = '';
  @Output() public hide = new EventEmitter();

  constructor(public authGuard: AuthGuard) { }

  ngOnInit(): void {
    let status = this.authGuard.isAuthenticated();
    console.log(status);
    this.hide.emit(!status);
    
  }

}
