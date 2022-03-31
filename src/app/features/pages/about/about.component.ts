import { Component, OnInit } from '@angular/core';
import SENTENCES from '../../../../assets/lib/sentences.json';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  ABOUT_SENTENCES: any;
  imageUrl: string = '../../../assets/images/qr-code-color.png';
  constructor() {
    this.ABOUT_SENTENCES = SENTENCES.ABOUT;
  }
  ngOnInit(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
}
