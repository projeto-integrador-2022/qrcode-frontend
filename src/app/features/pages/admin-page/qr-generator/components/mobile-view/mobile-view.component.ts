import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import SENTENCES from '../../../../../../../assets/lib/sentences.json';

@Component({
  selector: 'mobile-view',
  templateUrl: './mobile-view.component.html',
  styleUrls: ['./mobile-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MobileViewComponent implements OnInit {
  @Input() formData: any;
  formGroup: any;
  SOCIAL_ICONS: any;
  checked = false;

  constructor(private formBuilder: FormBuilder) {
    this.SOCIAL_ICONS = SENTENCES.SOCIAL_ICONS;
  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  onRadioClick(){
    this.checked = !this.checked;    
  }

  createFormGroup() {
    let emailregex: RegExp = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/

    this.formGroup = this.formBuilder.group({
      'product': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
    });
  }
  onSubmit(value: any) {  
    console.log(value);
  }


}
