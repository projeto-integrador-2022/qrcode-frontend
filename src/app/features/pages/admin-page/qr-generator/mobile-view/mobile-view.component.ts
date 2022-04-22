import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'mobile-view',
  templateUrl: './mobile-view.component.html',
  styleUrls: ['./mobile-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MobileViewComponent implements OnInit {
  @Input() formData: any;
  formGroup: any;

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    this.formGroup = this.formBuilder.group({
      'name': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'fone': [null],

    });
  }
  onSubmit(value: any) {
    console.log(value);
  }


}
