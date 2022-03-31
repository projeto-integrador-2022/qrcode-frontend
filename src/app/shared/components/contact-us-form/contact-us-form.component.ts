import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import SENTENCES from '../../../../assets/lib/sentences.json';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss']
})
export class ContactUsFormComponent implements OnInit {
  formGroup: any;
  fields: any;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createForm();
    this.populateFields();
  }


  createForm() {
    let emailregex: RegExp = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/

    this.formGroup = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.pattern(emailregex)]),
      field: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });

  }

  populateFields() {
    this.fields = [
      {
        "id": 1,
        "name": "Administrativo"
      },
      {
        "id": 2,
        "name": "Recursos Humanos"
      },
      {
        "id": 3,
        "name": "Suporte Técnico"
      },
      {
        "id": 4,
        "name": "Desenvolvimento de Sistemas"
      },
      {
        "id": 5,
        "name": "Marketing"
      }
    ];
  }
  
  onStateOptionChange(event: any) {
    this.formGroup.get('field').setValue(event.value);
  }

  onSubmit(data: any) {
    console.log('>>>>',data);
  }

  onClear() {
    this.formGroup.reset();
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED :
      this.formGroup.get('email').hasError('email') ? SENTENCES.FORM_ERROR[0].INVALID_EMAIL :
        '';
  }

  getErrorFields() {
    return this.formGroup.get('field').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED :
      '';
  }

  getErrorSubject() {
    return this.formGroup.get('subject').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED :
      '';
  }

  getErrorMessage() {
    return this.formGroup.get('message').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED :
      '';
  }

}
