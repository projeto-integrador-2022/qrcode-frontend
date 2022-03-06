import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  hide: boolean = true;
  hide2: boolean = false;
  option: number = 0;
  planTitle: string ='';
  price: any;
  isProgressBarActivated: boolean = false;
  progressMessage: string = '';


  constructor(private formBuilder: FormBuilder, private router : Router) { }

  get name() { return this.formGroup.get('name') as FormControl }
  get passwordInput() { return this.formGroup.get('password'); }  
  get passwordConfirmationInput() { return this.formGroup.get('passwordConfirmation'); } 

  ngOnInit() {
    this.option = history.state.index;
    this.populateTitle(this.option);
    this.createForm();
    this.setChangeValidate();   
  }

  populateTitle(state: number) {
    if (state == 0) {
      this.planTitle = 'Starter';
      this.price = 350;
    }
    if (state == 1) {
      this.planTitle = 'Professional';
      this.price = 750;
    }
    if (state == 2) {
      this.planTitle = 'Enterprise';
      this.price = 150
    }
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let cardregex: RegExp = /(\d{4}[-.\s]?){4}|\d{4}[-.\s]?\d{6}[-.\s]?\d{5}$/
    let phoneregex: RegExp = /^\(?[1-9]{2}\)?\s?\d{4,5}(\-|\s)?\d{4}$/
    let securitycoderegex : RegExp = /^\d{3}$/
    let expirationdateregex: RegExp = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
    let cardnameregex: RegExp = /^[a-zA-Z\s]+$/

    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'name': [null, [Validators.required, Validators.minLength(3), Validators.pattern(cardnameregex)]],
      'address': [null, [Validators.required, Validators.minLength(3)]],
      'password': [null, [Validators.required, this.checkPassword]],
      'passwordConfirmation': [null, [Validators.required, this.checkPassword]],
      'surname': [null, [Validators.required, Validators.minLength(3)]],
      'cardNumber': [null, [Validators.required, Validators.pattern(cardregex)]],
      'phone': [null, [Validators.required, Validators.pattern(phoneregex)]],
      'securitycode': [null, [Validators.required, Validators.pattern(securitycoderegex)]],
      'expirationdate': [null, [Validators.required, Validators.pattern(expirationdateregex)]],
      'cardname': [null, [Validators.required, Validators.minLength(5), Validators.pattern(cardnameregex)]],
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

  getErrorName() {
    return this.formGroup.get('name').hasError('required') ? 'Preenchimento necessário' :
      this.formGroup.get('name').hasError('minlength') ? 'Deve ter no mínimo de 3 caracteres' : '';
  }
  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Preenchimento necessário' :
      this.formGroup.get('email').hasError('pattern') ? 'Não é um email válido' :
        this.formGroup.get('email').hasError('alreadyInUse') ? 'Esse email já está sendo usado' : '';
  }

  getErrorSecurityCode() {
    return this.formGroup.get('securitycode').hasError('required') ? 'Preenchimento necessário' :
      this.formGroup.get('securitycode').hasError('pattern') ? 'Não é um número de segurança válido' :'';
  }
  getErrorCardNumber() {
    return this.formGroup.get('cardNumber').hasError('required') ? 'Preenchimento necessário' :
      this.formGroup.get('cardNumber').hasError('pattern') ? 'Não é um número de cartão válido' :'';
  }

  getErrorExpirationDate() {
    return this.formGroup.get('expirationdate').hasError('required') ? 'Preenchimento necessário' :
      this.formGroup.get('expirationdate').hasError('pattern') ? 'Não é uma data válida' :'';
  }

  getErrorCardName() {
    return this.formGroup.get('cardname').hasError('required') ? 'Preenchimento necessário' :
      this.formGroup.get('cardname').hasError('minlength') ? 'Deve ter no mínimo 5 caracteres' : '';
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

  getErrorSamePassword() {
    let isSame = this.formGroup.get('password').value === this.formGroup.get('passwordConfirmation').value;
    return isSame ? null : {'samePassword': true} ? 'As senhas não são iguais' : '';

  }
  onSubmit(post : any) {
    this.post = post;
    this.post.price = '' + this.price;
    this.post.planTitle = '' + this.planTitle;
    this.isProgressBarActivated = true;
    //this.router.navigate(['/login'], {state: {email: `${this.post.email}`, password: `${this.post.password}`}});
    
  }

}