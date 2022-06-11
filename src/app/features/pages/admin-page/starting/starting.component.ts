import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import SENTENCES from '../../../../../assets/lib/sentences.json'
import SENTENCES_PROD from '../../../../../assets/lib/sentences-prod.json'
import { environment } from 'src/environments/environment';

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
    if(environment.production){
      this.ADMIN_PAGE_SENTENCES = SENTENCES_PROD.ADMIN_PAGE;
    }else{
      this.ADMIN_PAGE_SENTENCES = SENTENCES.ADMIN_PAGE;
    }
  }

  ngOnInit(): void {
    this.scrollItUP();
    this.size = this.ADMIN_PAGE_SENTENCES.length;
  }

  scrollItUP() {
    window.scrollTo(0, 0);
  }

}
