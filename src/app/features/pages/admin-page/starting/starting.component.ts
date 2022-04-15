import { Component, OnInit } from '@angular/core';
import SENTENCES from '../../../../../assets/lib/sentences.json'

@Component({
  selector: 'starting-component',
  templateUrl: './starting.component.html',
  styleUrls: ['./starting.component.scss']
})
export class StartingComponent implements OnInit {
  STARTING_SENTENCES: any;

  constructor() {
    this.STARTING_SENTENCES = SENTENCES.STARTING;
  }

  ngOnInit(): void {
    console.log(this.STARTING_SENTENCES);

  }

}
