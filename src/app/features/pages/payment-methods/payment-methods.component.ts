import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiService } from 'src/app/shared/services/account-api.service';
import SENTENCES from '../../../../assets/lib/sentences.json';
import { CreditCard } from 'src/app/shared/models/creditcard';
import { Account } from 'src/app/shared/models/account';
import { PaymentPlan } from 'src/app/shared/models/payment-plan';
import { Login } from 'src/app/shared/models/login';
import { LocationService } from 'src/app/shared/services/location-api.service';
import { StateDistrict } from 'src/app/shared/models/state_district.model';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
})
export class PaymentMethodsComponent implements OnInit {
  account = {} as Account;
  creditCard = {} as CreditCard;
  plan = {} as PaymentPlan;
  login = {} as Login;

  formGroup: any;
  titleAlert: string = '';
  index: number = 0;
  post: any = '';
  hide: boolean = true;
  hide2: boolean = true;
  option: number = 0;
  planTitle: string = '';
  price: any;

  isProgressBarActivated: boolean = false;
  processingMessage: string = '';
  isPaymentSuccessful: boolean = false;

  states!: StateDistrict[];
  cities!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiService: ApiService,
    private locationService: LocationService
  ) {}

  get name() {
    return this.formGroup.get('name') as FormControl;
  }
  get passwordInput() {
    return this.formGroup.get('password');
  }

  ngOnInit() {
    this.index = history.state.index;
    this.populateStates();    
    this.populateTitle();
    this.createForm();
    this.setChangeValidate();
  }

  populateTitle() {
    if (this.index == 0) {
      this.planTitle = 'Starter';
      this.price = 350;
    }
    if (this.index == 1) {
      this.planTitle = 'Professional';
      this.price = 750;
    }
    if (this.index == 2) {
      this.planTitle = 'Enterprise';
      this.price = 150;
    }
  }

  createForm() {
    let username: RegExp = /[a-zA-Z][a-zA-Z0-9-_]{4,32}/;
    let emailregex: RegExp = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/;
    let cardregex: RegExp = /(\d{4}[-.\s]?){4}|\d{4}[-.\s]?\d{6}[-.\s]?\d{5}$/;
    let phoneregex: RegExp = /^\(?[1-9]{2}\)?\s?\d{4,5}(\-|\s)?\d{4}$/;
    let securitycoderegex: RegExp = /^\d{3}$/;
    let expirationdateregex: RegExp = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    let ownernameregex: RegExp = /^[a-zA-Z\s]+$/;
    let passwordregex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    this.formGroup = this.formBuilder.group({
      username: [
        null,
        [Validators.required, Validators.pattern(username)],
        this.checkInUseUsername,
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(emailregex)],
        this.checkInUseEmail,
      ],
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(ownernameregex),
        ],
      ],
      surname: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(ownernameregex),
        ],
      ],
      address: [null, [Validators.required, Validators.minLength(3)]],
      city: [null, [Validators.required, Validators.minLength(3)]],
      state: [null, [Validators.required, Validators.minLength(2)]],
      password: [
        null,
        [Validators.required, Validators.pattern(passwordregex)],
      ],
      passwordconfirmation: [null, [Validators.required]],
      cardnumber: [null, [Validators.required, Validators.pattern(cardregex)]],
      phone: [null, [Validators.required, Validators.pattern(phoneregex)]],
      securitycode: [
        null,
        [Validators.required, Validators.pattern(securitycoderegex)],
      ],
      expirationdate: [
        null,
        [Validators.required, Validators.pattern(expirationdateregex)],
      ],
      cardflag: [null, [Validators.required]],
      ownername: [
        null,
        [Validators.required, Validators.pattern(ownernameregex)],
      ],
      validate: '',
    });
  }

  setChangeValidate() {
    this.formGroup.get('validate').valueChanges.subscribe((validate: any) => {
      if (validate == '1') {
        this.titleAlert = SENTENCES.FORM_ERROR[0].FILL_CRITERIA;
      } else {
        this.formGroup.get('name').setValidators(Validators.required);
      }
      this.formGroup.get('name').updateValueAndValidity();
    });
  }

  checkPassword(control: any) {
    let enteredPassword = control.value;
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return !passwordCheck.test(enteredPassword) && enteredPassword
      ? { requirements: true }
      : null;
  }

  checkInUseEmail(control: any) {
    // mimic http database access
    let db = ['tony@gmail.com'];
    return new Observable((observer) => {
      setTimeout(() => {
        let result =
          db.indexOf(control.value) !== -1 ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }

  checkInUseUsername(control: any) {
    // mimic http database access
    let db = ['tony'];
    return new Observable((observer) => {
      setTimeout(() => {
        let result =
          db.indexOf(control.value) !== -1 ? { alreadyInUse: true } : null;
        observer.next(result);
        observer.complete();
      }, 4000);
    });
  }

  populateStates() {
    this.locationService.getStates().subscribe((states: StateDistrict[]) => {
      this.states = states;
      this.cities = this.states.map(s => s.cidades);
      

    });
    
  }

  populateCities(estado: any) {
    
    
    
  }

  onCityOptionChange(event: any) {
    this.formGroup.get('city').setValue(event.value);
  }

  onStateOptionChange(data: any) {
    
    
    this.populateCities(data.value);
    this.formGroup.get('state').setValue(data.value);
  }

  onCardFlagChange(event: any) {
    this.formGroup.get('cardflag').setValue(event.value);
  }

  onSubmit(data: any) {
    this.post = data;
    this.setSelectedPlan();
    this.processingUserData(data);
  }

  processingUserData(data: any) {
    this.saveCreditCardData(data);
    this.savePaymentPlan();
    this.saveLoginData(data);
    this.saveUserData(data);
    this.start();
  }

  saveCreditCardData(data: any) {
    this.creditCard.ownerName = data.ownername;
    this.creditCard.cardNumber = data.cardnumber;
    this.creditCard.securityCode = data.securitycode;
    this.creditCard.expirationDate = data.expirationdate;
    this.creditCard.cardFlag = data.cardflag;
  }

  savePaymentPlan() {
    if (this.index == 0) {
      this.plan.planId = 0;
      this.plan.title = 'Starter';
      this.plan.reportType = 'Relatórios Mensais';
      this.plan.clientQuantity = 10;
      this.plan.value = 350;
    }
    if (this.index == 1) {
      this.plan.planId = 1;
      this.plan.title = 'Professional';
      this.plan.reportType = 'Relatórios em Tempo Real';
      this.plan.clientQuantity = 20;
      this.plan.value = 750;
    }
    if (this.index == 2) {
      this.plan.planId = 2;
      this.plan.title = 'Enterprise';
      this.plan.reportType = 'Relatórios em Tempo Real';
      this.plan.clientQuantity = 50;
      this.plan.valuePerUser = 150;
    }
  }

  saveLoginData(data: any) {
    this.login.username = data.username;
    this.login.password = data.password;
  }

  saveUserData(data: any) {
    this.account.name = data.name;
    this.account.surname = data.surname;
    this.account.email = data.email;
    this.account.phone = data.phone;
    this.account.address = data.address;
    this.account.city = data.city;
    this.account.stateDistrict = data.state;
    this.account.login = this.login;
    this.account.creditCard = this.creditCard;
    this.account.paymentPlan = this.plan;
  }

  start() {
    this.startProgressBar();

    let isPaymentSuccessful = this.processingCreditCard();

    if (isPaymentSuccessful) {
      this.createAccount();
      this.redirecting();
    } else {
      this.delay(
        5000,
        SENTENCES.PROCESSING_SOLICITATION[0].CREDIT_CARD_NOT_ACCEPTED
      );
    }
  }

  startProgressBar() {
    this.isProgressBarActivated = true;
    this.delay(0, SENTENCES.PROCESSING_SOLICITATION[0].PROCESSING_PAYMENT);
  }

  processingCreditCard() {
    // credit card api call
    return true;
  }

  validadeCreditCard(billingDetails: CreditCard) {
    // logica para checar se cartão foi aceito pela operadora
    return true;
  }

  createAccount() {
    if (this.account !== undefined) {
      this.apiService.createAccount(this.account).subscribe(() => {
        this.cleanForm();
      });
    }
    this.delay(8000, SENTENCES.PROCESSING_SOLICITATION[0].CREATING_ACCOUNT);
  }

  setSelectedPlan() {
    this.post.price = '' + this.price;
    this.post.planTitle = '' + this.planTitle;
  }

  redirecting() {
    this.delay(5000, SENTENCES.PROCESSING_SOLICITATION[0].CREDIT_CARD_ACCEPTED);
    this.delay(10000, SENTENCES.PROCESSING_SOLICITATION[0].OK);
    this.delay(15000, '', true);
  }

  cleanForm() {
    this.formGroup.reset();
    this.account = {} as Account;
    this.creditCard = {} as CreditCard;
    this.plan = {} as PaymentPlan;
    this.login = {} as Login;
  }

  delay(mms: number, message: string, isPaymentSuccessful?: boolean) {
    setTimeout(() => {
      this.processingMessage = message;
      if (isPaymentSuccessful) {
        this.router.navigate(['/login'], {
          state: {
            username: `${this.post.username}`,
            password: `${this.post.password}`,
          },
        });
      }
    }, mms);
  }

  // Errors

  getErrorUsername() {
    return this.formGroup.get('username').hasError('required')
      ? SENTENCES.FORM_ERROR[0].REQUIRED
      : this.formGroup.get('username').hasError('alreadyInUse')
      ? SENTENCES.FORM_ERROR[0].NAME_IN_USE
      : this.formGroup.get('username').hasError('pattern')
      ? SENTENCES.FORM_ERROR[0].FILL_CRITERIA
      : '';
  }
  getErrorName() {
    return this.formGroup.get('name').hasError('required')
      ? SENTENCES.FORM_ERROR[0].REQUIRED
      : this.formGroup.get('name').hasError('minlength')
      ? SENTENCES.FORM_ERROR[0].FILL_CRITERIA
      : '';
  }
  getErrorEmail() {
    return this.formGroup.get('email').hasError('required')
      ? SENTENCES.FORM_ERROR[0].REQUIRED
      : this.formGroup.get('email').hasError('pattern')
      ? SENTENCES.FORM_ERROR[0].INVALID_EMAIL
      : this.formGroup.get('email').hasError('alreadyInUse')
      ? SENTENCES.FORM_ERROR[0].EMAIL_IN_USE
      : '';
  }

  getErrorState() {
    return this.formGroup.get('state').hasError('required')
      ? SENTENCES.FORM_ERROR[0].REQUIRED
      : '';
  }

  getErrorCity() {
    return this.formGroup.get('city').hasError('required')
      ? SENTENCES.FORM_ERROR[0].REQUIRED
      : '';
  }

  getErrorSecurityCode() {
    return this.formGroup.get('securitycode').hasError('required')
      ? SENTENCES.FORM_ERROR[0].REQUIRED
      : this.formGroup.get('securitycode').hasError('pattern')
      ? SENTENCES.FORM_ERROR[0].CVC_NOT_VALID
      : '';
  }
  getErrorCardNumber() {
    return this.formGroup.get('cardnumber').hasError('required')
      ? SENTENCES.FORM_ERROR[0].REQUIRED
      : this.formGroup.get('cardnumber').hasError('pattern')
      ? SENTENCES.FORM_ERROR[0].CARD_NUMBER_NOT_VALID
      : '';
  }

  getErrorExpirationDate() {
    return this.formGroup.get('expirationdate').hasError('required')
      ? SENTENCES.FORM_ERROR[0].REQUIRED
      : this.formGroup.get('expirationdate').hasError('pattern')
      ? SENTENCES.FORM_ERROR[0].CARD_EXPIRATION_NOT_VALID
      : '';
  }

  getErrorOwnerName() {
    return this.formGroup.get('ownername').hasError('required')
      ? SENTENCES.FORM_ERROR[0].REQUIRED
      : this.formGroup.get('ownername').hasError('minlength')
      ? SENTENCES.FORM_ERROR[0].FILL_CRITERIA
      : '';
  }

  getErrorPhoneNumber() {
    return this.formGroup.get('phone').hasError('required')
      ? SENTENCES.FORM_ERROR[0].REQUIRED
      : this.formGroup.get('phone').hasError('pattern')
      ? SENTENCES.FORM_ERROR[0].PHONE_NOT_VALID
      : '';
  }

  getAddressError() {
    return this.formGroup.get('address').hasError('required')
      ? SENTENCES.FORM_ERROR[0].REQUIRED
      : this.formGroup.get('address').hasError('minlength')
      ? SENTENCES.FORM_ERROR[0].FILL_CRITERIA
      : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required')
      ? SENTENCES.FORM_ERROR[0].REQUIRED
      : this.formGroup.get('password').hasError('requirements')
      ? SENTENCES.FORM_ERROR[0].PASSWORD_NOT_VALID
      : '';
  }

  getErrorPasswordMissmatch() {
    const password = this.formGroup.get('password').value;
    let passwordConfirmation = this.formGroup.get('passwordconfirmation').value;

    if (password !== passwordConfirmation) {
      return password !== passwordConfirmation
        ? SENTENCES.FORM_ERROR[0].PASSWORD_MISMATCH
        : 'test';
    } else {
      return this.formGroup.get('password').hasError('required')
        ? SENTENCES.FORM_ERROR[0].REQUIRED
        : this.formGroup.get('password').hasError('requirements')
        ? SENTENCES.FORM_ERROR[0].PASSWORD_NOT_VALID
        : '';
    }
  }
}
