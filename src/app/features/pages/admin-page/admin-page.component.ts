import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthGuard } from 'src/app/shared/services/auth.guard';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {


  constructor(public authGuard: AuthGuard) { }

  ngOnInit(): void {
    
  }

}
