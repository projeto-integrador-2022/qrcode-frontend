import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  hide!: boolean;

  constructor(private router: Router) {

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        if (event.url !== '/payment-plans') {
          this.hide = true;
        } else this.hide = false;
      }
    });
  }

  ngOnInit(): void {}

  public navigateTo() {
    this.router.navigate(['/payment-plans']);
    this.scrollUp();
  }
  
  scrollUp() {
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
  }
}
