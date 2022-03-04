import { Component, OnInit } from '@angular/core';
import SENTENCES from '../../../../assets/lib/sentences.json';

@Component({
  selector: 'app-us',
  templateUrl: './us.component.html',
  styleUrls: ['./us.component.scss'],
})
export class UsComponent implements OnInit {
  imageUrl: string = '../../../assets/images/banner-example.png';
  US_SENTENCES: any;
  size: number = 0;
  constructor() {
    this.US_SENTENCES = SENTENCES.US;
  }

  ngOnInit(): void {
    this.size = this.US_SENTENCES.length;
  }
}