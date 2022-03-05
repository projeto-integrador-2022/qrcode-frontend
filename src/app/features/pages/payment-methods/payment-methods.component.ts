import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import SENTENCES from '../../../../assets/lib/sentences.json';


@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
})
export class PaymentMethodsComponent implements OnInit {
  FORM_SENTENCES: any;
  name = new FormControl('');

  constructor() {
    this.FORM_SENTENCES = SENTENCES.PAYMENT_METHODS_FORM;
  }
  
  ngOnInit(): void {
    console.log(this.FORM_SENTENCES);
    
    console.log(history.state);
  }

}
