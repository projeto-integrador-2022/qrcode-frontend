import { Component, OnInit, ViewEncapsulation, Input, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

import { QrDialogComponent } from './components/qr-dialog/qr-dialog.component';
import { QrGeneratorService } from 'src/app/shared/services/qr-generator.service';

import { Qr } from '../../../../shared/models/qr';

import SENTENCES from '../../../../../assets/lib/sentences.json'

@Component({
  selector: 'qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss'],
  encapsulation: ViewEncapsulation.None,
})

export class QrGeneratorComponent implements OnInit {
  @Input() formData: any;

  formGroup: any;
  selected = '';

  GENERATOR_SENTENCES: any;
  IMAGE: any;
  ADMIN_SENTENCES: any;
  INTRO_SENTENCES: any;

  isQrViewEnabled = false;
  saveSpinner = false;
  delSpinner = false;

  qrList = Array<Qr>();
  qr!: Qr;
  image: any;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private qrService: QrGeneratorService, private router: Router, private el: ElementRef) {
    this.GENERATOR_SENTENCES = SENTENCES.GENERATOR;
    this.IMAGE = SENTENCES.MOBILE;
    this.ADMIN_SENTENCES = SENTENCES.ADMIN_PAGE;
    this.INTRO_SENTENCES = SENTENCES.QR_GENERATOR_INFO;
    this.buildFormData();
  }

  ngOnInit(): void {
    this.createForm();
    this.populateSelector();

  }
  buildFormData() {
    this.formData = [
      {
        product: '',
        cnpj: '',
        email: '',
        officialpage: '',
        whatsapp: '',
        telegram: '',
        facebook: '',
        instagram: '',
        youtube: '',
        voucher_url: '',
        announce: ''
      }
    ]
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let cnpj: RegExp = /(\d{2}[-.\s]?\d{3}[-.\s]?\d{3}[-.\s\/]?\d{4}[-.\s]?\d{2})$/;
    let url: RegExp = /(https?:\/\/(www\.)?|www\.)((\w-?\.?){2,}\.)([a-z]){2,6}\/?([a-z0-9]|&|\.|\?|=|-|_|\#|%|:|\/)*/;

    this.formGroup = this.formBuilder.group({
      'product': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      'cnpj': [null, Validators.pattern(cnpj)],
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'officialpage': [null, Validators.pattern(url)],
      'whatsapp': [null, Validators.pattern(url)],
      'telegram': [null, Validators.pattern(url)],
      'facebook': [null, Validators.pattern(url)],
      'instagram': [null, Validators.pattern(url)],
      'youtube': [null, Validators.pattern(url)],
      'voucher_url': [null, Validators.pattern(url)],
      'announce': [null, Validators.required]
    });

  }

  populateSelector() {
    this.qrList = [];
    this.getQrList();

  }

  getQrList() {
    this.qrService.getQrList().subscribe(
      (data: any) => {
        data.forEach((code: Qr) => {
          this.qrList.push(code);
        })
      });
      console.log(this.qrList);
      
  }


  populateFields(data: Qr) {
    this.formGroup.get("product").setValue(data.product);
    this.formGroup.get("cnpj").setValue(data.cnpj);
    this.formGroup.get("email").setValue(data.email);
    this.formGroup.get("officialpage").setValue(data.officialpage);
    this.formGroup.get("whatsapp").setValue(data.whatsapp);
    this.formGroup.get("telegram").setValue(data.telegram);
    this.formGroup.get("facebook").setValue(data.facebook);
    this.formGroup.get("instagram").setValue(data.instagram);
    this.formGroup.get("youtube").setValue(data.youtube);
    this.formGroup.get("voucher_url").setValue(data.voucher_url);
    this.formGroup.get("announce").setValue(data.announce);

    this.formData[0]['product'] = data.product;
    this.formData[0]['cnpj'] = data.cnpj;
    this.formData[0]['email'] = data.email;
    this.formData[0]['officialpage'] = data.officialpage;
    this.formData[0]['whatsapp'] = data.whatsapp;
    this.formData[0]['telegram'] = data.telegram;
    this.formData[0]['facebook'] = data.facebook;
    this.formData[0]['instagram'] = data.instagram;
    this.formData[0]['youtube'] = data.youtube;
    this.formData[0]['voucher_url'] = data.voucher_url;
    this.formData[0]['announce'] = data.announce;

  }

  updateMobileView(event: any, formName: string) {
    if (this.formGroup.controls[formName].valid) {
      this.formData[0][formName] = event.target.value;
    }

    if (this.formData[0]['product']) {
      if (this.formData[0]['product'].length > 20) {
        this.formData[0]['product'] = this.formData[0][formName].substring(0, 20);
      }
    } 
    

    // if (this.formData[0]['announce'].length > 137) {
    //   this.formData[0]['announce'] = this.formData[0][formName].substring(0, 137);
    // }
  }

  clear() {
    this.buildFormData();
    this.formGroup.reset();
    this.selected = '';
  }

  save() {
    this.saveNewQr(this.getQrObject());
    this.isQrViewEnabled = true;
    this.showSpinner('save');
  }

  getQrObject() {
    let newQr: Qr = {
      product: this.formGroup.get('product').value,
      cnpj: this.formGroup.get('cnpj').value,
      email: this.formGroup.get('email').value,
      officialpage: this.formGroup.get('officialpage').value,
      whatsapp: this.formGroup.get('whatsapp').value,
      telegram: this.formGroup.get('telegram').value,
      facebook: this.formGroup.get('facebook').value,
      instagram: this.formGroup.get('instagram').value,
      youtube: this.formGroup.get('youtube').value,
      voucher_url: this.formGroup.get('voucher_url').value,
      announce: this.formGroup.get('announce').value,
      username: localStorage.getItem('user')?.toString() 
    }
    return newQr;
  }

  saveNewQr(newQr: Qr) {
    debugger
    this.qrService.saveNewQr(newQr).subscribe(
      (response) => {
        this.showSpinner('save');
        this.populateSelector();
      });

    this.qrList = [];
    this.getQrList();
    this.qrList.forEach(element => {
      if (element.product === newQr.product) {
        this.image = element.image;
      }

    });
    console.log(newQr);

  }

  delete() {
    this.qrList.forEach(element => {
      if (element.product === this.selected) {
        this.qrService.deleteQr(element.id!).subscribe(
          (response) => {
            this.buildFormData();
            this.showSpinner('del');
            this.formGroup.reset();
            this.populateSelector();
          });
      }
      this.isQrViewEnabled = false;
    });
  }

  update() {
    this.qrList.forEach(element => {
      if (element.product === this.selected) {
        this.qrService.updateQr(element.id!, this.getQrObject()).subscribe(
          (response) => {
            this.isQrViewEnabled = true;
            this.showSpinner('save');
            this.populateSelector();
          });
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(QrDialogComponent, {
      data: this.image,
      width: '20vw',
      height: '35vh',
    });
  }

  showSpinner(kind: any) {

    if (kind == 'save') {
      this.saveSpinner = true;
      setTimeout(() => {
        this.saveSpinner = true;
      }, 1500)

      setTimeout(() => {
        this.saveSpinner = false;
      }, 1500)
    } else {
      this.delSpinner = true;
      setTimeout(() => {
        this.delSpinner = true;
      }, 1500)

      setTimeout(() => {
        this.delSpinner = false;
      }, 1500)
    };
  }
}

