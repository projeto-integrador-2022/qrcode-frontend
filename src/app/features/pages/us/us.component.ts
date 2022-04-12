import { Component, OnInit } from '@angular/core';
import SENTENCES from '../../../../assets/lib/sentences.json';

@Component({
  selector: 'app-us',
  templateUrl: './us.component.html',
  styleUrls: ['./us.component.scss'],
})
export class UsComponent implements OnInit {
  imageUrl: string = '../../../assets/images/ppl-working-cropped.jpg'; 
  US_SENTENCES: any;
  size: number = 0;
  
  constructor() {
    this.US_SENTENCES = SENTENCES.US;
  }

  ngOnInit(): void {
    this.size = this.US_SENTENCES.length;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
