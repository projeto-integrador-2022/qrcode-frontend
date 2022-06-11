import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import SENTENCES from '../../../../assets/lib/sentences.json';
import SENTENCES_PROD from '../../../../assets/lib/sentences-prod.json';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  LANDING_PAGE_SENTENCES: any;
  size!:number;

  constructor(private router: Router) {
    if(environment.production){
      this.LANDING_PAGE_SENTENCES = SENTENCES_PROD.LANDING_PAGE
    }else{
      this.LANDING_PAGE_SENTENCES = SENTENCES.LANDING_PAGE;
    }
  }

  ngOnInit(): void {  
    this.size = SENTENCES.LANDING_PAGE.length;
    this.scrollUp();
 
  }

  public navigateTo() {
    this.router.navigate(['/about']);
    
  }

  scrollUp() {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    }); 
  }
}
