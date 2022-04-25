import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import SENTENCES from '../../../../../assets/lib/sentences.json'
import { QrDialogComponent } from './components/qr-dialog/qr-dialog.component';

@Component({
  selector: 'qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QrGeneratorComponent implements OnInit {
  @Input() formData: any;

  formGroup: any;
  selected = '';

  GENERATOR_SENTENCES: any;
  IMAGE: any;
  ADMIN_SENTENCES: any;
  isQrViewEnabled = false;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.GENERATOR_SENTENCES = SENTENCES.GENERATOR;
    this.IMAGE = SENTENCES.MOBILE;
    this.ADMIN_SENTENCES = SENTENCES.ADMIN_PAGE;

    this.formData = [
      {
        name: '',
        cnpj: '',
        email: '',
        officialpage: '',
        whatsappgroup: '',
        telegramgroup: '',
        facebookgroup: '',
        instagramgroup: '',
        youtube: '',
        voucherpage: '',
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
    let cnpj: RegExp = /(\d{2}[-.\s]?\d{3}[-.\s]?\d{3}[-.\s\/]?\d{4}[-.\s]?\d{2})$/;
    let url: RegExp = /(https?:\/\/(www\.)?|www\.)((\w-?\.?){2,}\.)([a-z]){2,6}\/?([a-z0-9]|&|\.|\?|=|-|_|\#|%|:|\/)*/;

    this.formGroup = this.formBuilder.group({
      'name': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'cnpj': [null, Validators.pattern(cnpj)],
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'officialpage': [null, Validators.pattern(url)],
      'whatsappgroup': [null, Validators.pattern(url)],
      'telegramgroup': [null, Validators.pattern(url)],
      'facebookgroup': [null, Validators.pattern(url)],
      'instagramgroup': [null, Validators.pattern(url)],
      'youtube': [null, Validators.pattern(url)],
      'voucherpage': [null, Validators.pattern(url)],
      'announcement': [null, Validators.required],
      'validate': ''
    });

  } 

  updateMobileView(event: any, formName: string) {

    if (this.formGroup.controls[formName].valid) {
      this.formData[0][formName] = event.target.value;            
    }

    if (this.formData[0]['name'].length > 20) {
      this.formData[0]['name'] = this.formData[0][formName].substring(0, 20);
    }

    if (this.formData[0]['announcement'].length > 137) {
      this.formData[0]['announcement'] = this.formData[0][formName].substring(0, 137);
    }
  }

  save(data : FormBuilder) {
    console.log(data);
    this.isQrViewEnabled = true;
  }

  delete(data : FormBuilder) {
    this.isQrViewEnabled = false;
  }

  update(data : FormBuilder) {
    this.isQrViewEnabled = true;
  }

  openDialog(data : FormBuilder) {
    const dialogRef = this.dialog.open(QrDialogComponent, {
      width: '20vw',
      height: '35vh',
    });
  }

  scrollItUP() {
    window.scrollTo(0, 0);
  }

}
