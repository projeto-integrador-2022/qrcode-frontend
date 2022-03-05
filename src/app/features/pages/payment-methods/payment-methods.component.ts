import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs'


@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
})
export class PaymentMethodsComponent implements OnInit {

  formGroup: any;
  titleAlert: string = 'Preenchimento necessário';
  post: any = '';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
    this.setChangeValidate()
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let cardregex: RegExp = /((?!0000)\d{4}[ -]){3}(?!0000)\d{4}$/
    let phoneregex: RegExp = /^\(?[1-9]{2}\)?\s?\d{4,5}(\-|\s)?\d{4}$/

    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'name': [null, Validators.required, Validators.minLength(5)],
      'address': [null, Validators.required, Validators.minLength(5)],
      'password': [null, [Validators.required, this.checkPassword]],
      'surname': [null, [Validators.required, Validators.minLength(5)]],
      'cardNumber': [null, [Validators.required, Validators.pattern(cardregex)]],
      'phone': [null, [Validators.required, Validators.pattern(phoneregex)]],
      'validate': ''
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate: any) => {
        if (validate == '1') {
          this.formGroup.get('name').setValidators([Validators.required, Validators.minLength(3)]);
          this.titleAlert = "Deve ter no mínimo de 3 caracteres";
        } else {
          this.formGroup.get('name').setValidators(Validators.required);
        }
        this.formGroup.get('name').updateValueAndValidity();
      }
    )
  }

  get name() {
    return this.formGroup.get('name') as FormControl
  }

  checkPassword(control : any) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  checkInUseEmail(control : any) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Preenchimento necessário' :
      this.formGroup.get('email').hasError('pattern') ? 'Não é um email válido' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'Esse email já está sendo usado' : '';
  }

  getErrorCardNumber() {
    return this.formGroup.get('cardNumber').hasError('required') ? 'Preenchimento necessário' :
      this.formGroup.get('cardNumber').hasError('pattern') ? 'Não é um número de cartão válido' :'';
  }

  getErrorPhoneNumber() {
    return this.formGroup.get('phone').hasError('required') ? 'Preenchimento necessário' :
      this.formGroup.get('phone').hasError('pattern') ? 'Não é um número de telefone válido' :'';
  }

  getAddressError() {
    return this.formGroup.get('address').hasError('required') ? 'Preenchimento necessário' :
      this.formGroup.get('address').hasError('minlength') ? 'Deve ter no mínimo 5 caracteres' : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? 'Preenchimento necessário (no mínimo 8 digitos, pelo menos uma letra maiúscula e um número)' :
      this.formGroup.get('password').hasError('requirements') ? 'A senha precisa ter no mínimo 8 digitos, pelo menos uma letra maiúscula e um número' : '';
  }

  getSamePassword() {
    return this.formGroup.get('password').hasError('samePassword') ? 'As senhas não coincidem' : '';
  }
  onSubmit(post : any) {
    this.post = post;
  }

}
