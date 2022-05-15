import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SENTENCES from '../../../../../assets/lib/sentences.json'

@Component({
  selector: 'starting-component',
  templateUrl: './starting.component.html',
  styleUrls: ['./starting.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StartingComponent implements OnInit {
  ADMIN_PAGE_SENTENCES: any;
  size: number = 0;

  constructor() {
    this.ADMIN_PAGE_SENTENCES = SENTENCES.ADMIN_PAGE ;
  }

  ngOnInit(): void {
    this.scrollItUP();
    this.size = this.ADMIN_PAGE_SENTENCES.length;
  }

  scrollItUP() {
    window.scrollTo(0, 0);
  }

}
