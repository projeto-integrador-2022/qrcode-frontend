import { Component, OnInit } from '@angular/core';
import SENTENCES from '../../../../../assets/lib/sentences.json'

@Component({
  selector: 'starting-component',
  templateUrl: './starting.component.html',
  styleUrls: ['./starting.component.scss'],
})
export class StartingComponent implements OnInit {
  ADMIN_PAGE_SENTENCES: any;
  size: number = 0;

  constructor() {
    this.ADMIN_PAGE_SENTENCES = SENTENCES.ADMIN_PAGE ;
  }

  ngOnInit(): void {
    this.size = this.ADMIN_PAGE_SENTENCES.length;
  }

}
