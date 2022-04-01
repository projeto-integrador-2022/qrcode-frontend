import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs'
import SENTENCES from '../../../../assets/lib/sentences.json';
import { CreditCard } from 'src/app/shared/models/creditcard.model';
import { BillingDetails } from 'src/app/shared/models/billingDetails.model';

import { Time } from '@angular/common';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
})
export class PaymentMethodsComponent implements OnInit {

  formGroup: any;
  titleAlert: string = '';
  post: any = '';
  hide: boolean = true;
  hide2: boolean = true;
  option: number = 0;
  planTitle: string ='';
  price: any;

  isProgressBarActivated: boolean = false;
  processingMessage: string = '';
  isPaymentSuccessful: boolean = false;


  states: any;
  cities: any;

  constructor(private formBuilder: FormBuilder, private router : Router) {}

  get name() { return this.formGroup.get('name') as FormControl }
  get passwordInput() { return this.formGroup.get('password'); }  


  ngOnInit() {
    this.option = history.state.index;
    this.populateStates();
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
    let username: RegExp = /[a-zA-Z][a-zA-Z0-9-_]{4,32}/;
    let emailregex: RegExp = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/
    let cardregex: RegExp = /(\d{4}[-.\s]?){4}|\d{4}[-.\s]?\d{6}[-.\s]?\d{5}$/
    let phoneregex: RegExp = /^\(?[1-9]{2}\)?\s?\d{4,5}(\-|\s)?\d{4}$/
    let securitycoderegex : RegExp = /^\d{3}$/
    let expirationdateregex: RegExp = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
    let cardnameregex: RegExp = /^[a-zA-Z\s]+$/
    let passwordregex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    this.formGroup = this.formBuilder.group({
      'username': [null, [Validators.required, Validators.pattern(username)], this.checkInUseUsername],
      'email': [null, [Validators.required, Validators.pattern(emailregex)], this.checkInUseEmail],
      'name': [null, [Validators.required, Validators.minLength(3), Validators.pattern(cardnameregex)]],
      'surname': [null, [Validators.required, Validators.minLength(3), Validators.pattern(cardnameregex)]],
      'address': [null, [Validators.required, Validators.minLength(3)]],
      'city': [null, [Validators.required, Validators.minLength(3)]],
      'state': [null, [Validators.required, Validators.minLength(2)]],
      'password': [null, [Validators.required, Validators.pattern(passwordregex)]],
      'passwordconfirmation': [null, [Validators.required]],
      'cardNumber': [null, [Validators.required, Validators.pattern(cardregex)]],
      'phone': [null, [Validators.required, Validators.pattern(phoneregex)]],
      'securitycode': [null, [Validators.required, Validators.pattern(securitycoderegex)]],
      'expirationdate': [null, [Validators.required, Validators.pattern(expirationdateregex)]],
      'cardType': [null, [Validators.required]],
      'cardname': [null, [Validators.required, Validators.pattern(cardnameregex)]],
      'validate': ''
    });
  }


  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe(
      (validate: any) => {
        if (validate == '1') {
          this.titleAlert = SENTENCES.FORM_ERROR[0].FILL_CRITERIA ;
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

  checkInUseUsername(control : any) {
    // mimic http database access
    let db = ['tony'];
    return new Observable(observer => {
      setTimeout(() => {
        let result = (db.indexOf(control.value) !== -1) ? { 'alreadyInUse': true } : null;
        observer.next(result);
        observer.complete();
      }, 4000)
    })
  }

  populateStates() {
    this.states = [
      {
        "name": "Goiás",
        "abbreviation": "Go"
      },
      {
        "name": "Alagoas",
        "abbreviation": "AL"
      },
      {
        "name": "Amapá",
        "abbreviation": "AP"
      }];
  }

  populateCities(event:any) {   
    console.log(event);
    
    
  }

  onCityOptionChange (event: any) { 
    this.formGroup.get('city').setValue(event.value);
  }

  onStateOptionChange (event: any) {
    this.populateCities(event.value);
    this.formGroup.get('state').setValue(event.value);
  }

  onCardTypeChange(event: any) {
    this.formGroup.get('cardType').setValue(event.value);
  }

  getErrorUsername() {
    return this.formGroup.get('username').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED :
      this.formGroup.get('username').hasError('alreadyInUse') ? SENTENCES.FORM_ERROR[0].NAME_IN_USE :
        this.formGroup.get('username').hasError('pattern') ? SENTENCES.FORM_ERROR[0].FILL_CRITERIA : '';
  }
  getErrorName() {
    return this.formGroup.get('name').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED :
      this.formGroup.get('name').hasError('minlength') ? SENTENCES.FORM_ERROR[0].FILL_CRITERIA : '';
  }
  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED :
      this.formGroup.get('email').hasError('pattern') ? SENTENCES.FORM_ERROR[0].INVALID_EMAIL :
        this.formGroup.get('email').hasError('alreadyInUse') ? SENTENCES.FORM_ERROR[0].EMAIL_IN_USE : '';
  }

  getErrorState() {
    return this.formGroup.get('state').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED : '';
  }

  getErrorCity() {  
    return this.formGroup.get('city').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED : '';
  }

  getErrorSecurityCode() {
    return this.formGroup.get('securitycode').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED :
      this.formGroup.get('securitycode').hasError('pattern') ? SENTENCES.FORM_ERROR[0].CVC_NOT_VALID :'';
  }
  getErrorCardNumber() {
    return this.formGroup.get('cardNumber').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED :
      this.formGroup.get('cardNumber').hasError('pattern') ? SENTENCES.FORM_ERROR[0].CARD_NUMBER_NOT_VALID :'';
  }

  getErrorExpirationDate() {
    return this.formGroup.get('expirationdate').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED :
      this.formGroup.get('expirationdate').hasError('pattern') ? SENTENCES.FORM_ERROR[0].CARD_EXPIRATION_NOT_VALID :'';
  }

  getErrorCardName() {
    return this.formGroup.get('cardname').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED :
      this.formGroup.get('cardname').hasError('minlength') ? SENTENCES.FORM_ERROR[0].FILL_CRITERIA : '';
  }

  getErrorPhoneNumber() {
    return this.formGroup.get('phone').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED :
      this.formGroup.get('phone').hasError('pattern') ? SENTENCES.FORM_ERROR[0].PHONE_NOT_VALID :'';
  }

  getAddressError() {
    return this.formGroup.get('address').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED :
      this.formGroup.get('address').hasError('minlength') ? SENTENCES.FORM_ERROR[0].FILL_CRITERIA : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED :
      this.formGroup.get('password').hasError('requirements') ? SENTENCES.FORM_ERROR[0].PASSWORD_NOT_VALID : '';
  }

  getErrorPasswordMissmatch() {
    const password = this.formGroup.get('password').value;
    console.log(password);
    
    let passwordConfirmation = this.formGroup.get('passwordconfirmation').value
    console.log(passwordConfirmation);


    if (password !== passwordConfirmation) {
    return password !== passwordConfirmation ? SENTENCES.FORM_ERROR[0].PASSWORD_MISMATCH : 'test';
    } else {
    return this.formGroup.get('password').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED :
      this.formGroup.get('password').hasError('requirements') ? SENTENCES.FORM_ERROR[0].PASSWORD_NOT_VALID : '';
    }

  }

  onSubmit(data : any) {
    this.post = data;
    this.setSelectedPlan();
    this.processingPayment(data);

  }

  processingPayment(data : any) {
    let creditCardDetails = new CreditCard(data.cardType, data.cardNumber, data.cardname, data.expirationdate, data.securitycode);
    let billingDetails = new BillingDetails(
      data.username,
      data.name,
      data.surname,
      data.email,
      data.phone,
      data.address,
      data.password,
      data.city,
      data.state,
      creditCardDetails,
      data.planTitle,
      data.price
    )

    this.start(creditCardDetails, billingDetails);
    
  }
  start(creditCardDetails : CreditCard, billingDetails : BillingDetails) {
    this.startProgressBar();


    let isPaymentSuccessful = this.processingCreditCard(creditCardDetails);

    if (isPaymentSuccessful) {
      this.createAccount(billingDetails);
      this.redirecting();
      
    } else {
      this.delay(5000, SENTENCES.PROCESSING_SOLICITATION[0].CREDIT_CARD_NOT_ACCEPTED);
    }
  }

  startProgressBar() {
    this.isProgressBarActivated = true;
    this.delay(0, SENTENCES.PROCESSING_SOLICITATION[0].PROCESSING_PAYMENT); 
  }

  processingCreditCard(creditCardDetails : CreditCard) {
    this.isPaymentSuccessful = this.validadeCreditCard(creditCardDetails);

    //credit card api logic

    if (this.isPaymentSuccessful == false) { 
      return false;
    } else {
      return true;
    }    
  }

  validadeCreditCard(billingDetails : CreditCard) {
    // logica para checar se cartão foi aceito pela operadora
    return true;
  }
  
  redirecting() {
    this.delay(5000, SENTENCES.PROCESSING_SOLICITATION[0].CREDIT_CARD_ACCEPTED); 
    this.delay(10000, SENTENCES.PROCESSING_SOLICITATION[0].OK);
    this.delay(15000,'',true); 
  }

  createAccount(billingDetails: BillingDetails) {
    console.log(billingDetails);
    this.delay(8000, SENTENCES.PROCESSING_SOLICITATION[0].CREATING_ACCOUNT); 
  }

  setSelectedPlan() {
    this.post.price = '' + this.price;
    this.post.planTitle = '' + this.planTitle;
    
  }

  delay(mms: number, message: string, isPaymentSuccessful?: boolean) {
    setTimeout(() => {     
      this.processingMessage = message;
      if (isPaymentSuccessful) {
        // this.router.navigate(['/login'], {state: {username: `${this.post.username}`, password: `${this.post.password}`}});
      }
      
    }, mms);
  }
}