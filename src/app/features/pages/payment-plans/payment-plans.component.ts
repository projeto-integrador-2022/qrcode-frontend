import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import SENTENCES from '../../../../assets/lib/sentences.json';
@Component({
  selector: 'app-payment-plans',
  templateUrl: './payment-plans.component.html',
  styleUrls: ['./payment-plans.component.scss'],
})
export class PaymentPlansComponent implements OnInit {
  PAYMENT_PLANS_SENTENCES: any;
  FAQ_SENTENCES: any;
  
  constructor(private router: Router) {
    this.PAYMENT_PLANS_SENTENCES = SENTENCES.PAYMENT_PLANS;
    this.FAQ_SENTENCES = SENTENCES.FAQ;
  }

  cardContentSize: number = 0;
  faqQuestionsSize: number = 0;

  ngOnInit(): void {
    this.cardContentSize = this.PAYMENT_PLANS_SENTENCES.length;
    this.faqQuestionsSize = this.FAQ_SENTENCES.length;
  }

  navigateTo(index: number) {
    
    this.router.navigate(['/payment-methods'], { state: { index: `${index}` }});
    
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  
}
