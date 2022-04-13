import { Component, Input,  OnChanges,  SimpleChanges,  ViewEncapsulation } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'qrcode-frontend';

  constructor(public authService: AuthService) {
  }
}
