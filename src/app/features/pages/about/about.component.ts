import { Component, OnInit } from '@angular/core';
import SENTENCES from '../../../../assets/lib/sentences.json';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements OnInit {
  ABOUT_SENTENCES: any;
  constructor() {
    this.ABOUT_SENTENCES = SENTENCES.ABOUT;
  }
  ngOnInit(): void {
  }
}
