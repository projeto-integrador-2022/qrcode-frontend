import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { AuthGuard } from 'src/app/shared/services/auth.guard';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminPageComponent implements OnInit {


  constructor(public authGuard: AuthGuard) { }

  ngOnInit(): void {
    
  }

}
