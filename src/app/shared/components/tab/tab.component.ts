import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';

import SENTENCES from '../../../../assets/lib/sentences.json'

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TabComponent implements OnInit {
  TAB_SENTENCES: any;
  selected = new FormControl(0);

  constructor() { 
    this.TAB_SENTENCES = SENTENCES.ADMIN_PAGE;
  }

  ngOnInit(): void {
    console.log(this.TAB_SENTENCES[0].TITLE);
    
  }

}
