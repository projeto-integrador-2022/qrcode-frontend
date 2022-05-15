import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public isMenuCollapsed = true;
  public imageUrl = environment.images.nav_bar

  constructor(private router: Router,  public authService: AuthService) { }

  ngOnInit(): void {
  }


}
