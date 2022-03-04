import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SENTENCES from '../../../../assets/lib/sentences.json';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  LANDING_PAGE_SENTENCES: any;
  constructor(private router: Router) {
    this.LANDING_PAGE_SENTENCES = SENTENCES.LANDING_PAGE;
  }

  ngOnInit(): void {    
  }

  public navigateTo() {
    this.router.navigate(['/about']);
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
