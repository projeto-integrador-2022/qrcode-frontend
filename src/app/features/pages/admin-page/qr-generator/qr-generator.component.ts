import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import SENTENCES from '../../../../../assets/lib/sentences.json'

@Component({
  selector: 'qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QrGeneratorComponent implements OnInit {
  GENERATOR_SENTENCES: any;
  formGroup: any;
  constructor(private formBuilder: FormBuilder,) { 
    this.GENERATOR_SENTENCES = SENTENCES.GENERATOR;
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name' : [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
  }
  onSubmit(value: any) {
  }

}
