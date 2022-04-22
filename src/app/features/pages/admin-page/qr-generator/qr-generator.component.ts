import { Component, OnInit, ViewEncapsulation, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import SENTENCES from '../../../../../assets/lib/sentences.json'

@Component({
  selector: 'qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QrGeneratorComponent implements OnInit {

  formGroup: any;
  selected = '';

  @Input() formData: any;
  GENERATOR_SENTENCES: any;
  IMAGE: any;
  ADMIN_SENTENCES: any;

  constructor(private formBuilder: FormBuilder) {
    this.GENERATOR_SENTENCES = SENTENCES.GENERATOR;
    this.IMAGE = SENTENCES.MOBILE;
    this.ADMIN_SENTENCES = SENTENCES.ADMIN_PAGE;

    this.formData = [
      {
        name: '',
        cnpj: '',
        email: '',
        officialpage: '',
        productpage: '',
        whatsappgroup: '',
        telegramgroup: '',
        facebookgroup: '',
        instagramgroup: '',
        voucherpage: '',
        banner: '',
        announcement: ''
      }
    ]
  }

  ngOnInit(): void {
    this.scrollItUP();
    this.createForm();
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let cnpj: RegExp = /(\d{2}[-.\s]?\d{3}[-.\s]?\d{3}[-.\s\/]?\d{4}[-.\s]?\d{2})$/

    this.formGroup = this.formBuilder.group({
      'name': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'cnpj': [null, Validators.pattern(cnpj)],
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'officialpage': [null],
      'productpage': [null],
      'whatsappgroup': [null],
      'telegramgroup': [null],
      'facebookgroup': [null],
      'instagramgroup': [null],
      'voucherpage': [null],
      'banner': [null],
      'announcement': [null],
    });
  }

  updateMobileView(event: any, formName: string) {
    let string = this.formData[0]['name'];
    this.formData[0][formName] = event.target.value;
    if (this.formData[0]['name'].length > 20) {
      this.formData[0]['name'] = string.substring(0, 20);
    }

    

  }

  onSubmit(formData: any) {
  }


  scrollItUP() {
    window.scrollTo(0, 0);
  }

  populateForm(index: number, divClass: string) {
    if (divClass === 'top-form' && (index === 0 || index === 1 || index === 2)) {
      return true;
    }
    return false;

  }
}
