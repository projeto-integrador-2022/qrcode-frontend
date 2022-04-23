import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AccountService } from 'src/app/shared/services/account.service';
import { CreditCard } from 'src/app/shared/models/creditcard';
import { Account } from 'src/app/shared/models/account';
import { PaymentPlan } from 'src/app/shared/models/payment-plan';
import { User } from '../../../shared/models/user.model';
import { LocationService } from 'src/app/shared/services/location-api.service';
import { StateDistrict } from 'src/app/shared/models/state-district.model';
import { City } from 'src/app/shared/models/city.model';

import SENTENCES from '../../../../assets/lib/sentences.json';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
})
export class PaymentMethodsComponent implements OnInit {
  account = {} as Account;
  creditCard = {} as CreditCard;
  plan = {} as PaymentPlan;
  user = {} as User;

  formGroup: any;
  titleAlert: string = '';
  index: number = 0;
  post: any = '';
  hide: boolean = true;
  hide2: boolean = true;
  option: number = 0;
  planTitle: string = '';
  price: any;
  REGISTER_TEXT: any;
  CREDIT_CARD_TEXT: any;

  isProgressBarActivated: boolean = false;
  processingMessage: string = '';
  isPaymentSuccessful: boolean = false;

  states!: StateDistrict[];
  cities!: City[];
  state!: StateDistrict;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private locationService: LocationService
  ) {
    this.REGISTER_TEXT = SENTENCES.REGISTER;
    this.CREDIT_CARD_TEXT = SENTENCES.CREDIT_CARD;
  }

  get name() {
    return this.formGroup.get('name') as FormControl;
  }
  get passwordInput() {
    return this.formGroup.get('password');
  }

  ngOnInit() {
    this.index = history.state.index;
    if(!this.index) {
      this.router.navigate(['/landing-page']);
    }
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
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let cardregex: RegExp = /(\d{4}[-.\s]?){4}|\d{4}[-.\s]?\d{6}[-.\s]?\d{5}$/
    let phoneregex: RegExp = /^\(?[1-9]{2}\)?\s?\d{4,5}(\-|\s)?\d{4}$/
    let securitycoderegex : RegExp = /^\d{3}$/
    let expirationdateregex: RegExp = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
    let cardnameregex: RegExp = /^[a-zA-Z\s]+$/
    let passwordregex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

    this.formGroup = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'name': [null, [Validators.required, Validators.minLength(3)]],
      'username': [null, [Validators.required, Validators.minLength(3)]],
      'state': [null, [Validators.required]],
      'city': [null, [Validators.required]],
      'address': [null, [Validators.required, Validators.minLength(3)]],
      'password': [null, [Validators.required, Validators.pattern(passwordregex)]],
      'passwordconfirmation': [null, [Validators.required, Validators.pattern(passwordregex)]],
      'surname': [null, [Validators.required, Validators.minLength(3)]],
      'cardnumber': [null, [Validators.required, Validators.pattern(cardregex)]],
      'phone': [null, [Validators.required, Validators.pattern(phoneregex)]],
      'securitycode': [null, [Validators.required, Validators.pattern(securitycoderegex)]],
      'cardflag': [null, [Validators.required]],
      'expirationdate': [null, [Validators.required, Validators.pattern(expirationdateregex)]],
      'ownername': [null, [Validators.required, Validators.minLength(5), Validators.pattern(cardnameregex)]],
      'validate': ''
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

  checkInUseEmail(control: any) {
    return true;
  }

  populateStates() {
    this.locationService.getStates().subscribe(
      (data: any) => {
        this.states = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  populateCities(stateName: any) {
    this.cities = new Array<City>();
    for (let i = 0; i < this.states.length; i++) {
      if (this.states[i].name == stateName) {
        for (let j = 0; j < this.states[i].cities.length; j++) {
          this.cities.push(this.states[i].cities[j]);
        }
      }
    }
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
    this.saveUserData(data);
    this.start();
  }

  saveCreditCardData(data: any) {
    this.creditCard.ownerName = data.ownername;
    this.creditCard.cardNumber = data.cardnumber.trim();
    this.creditCard.securityCode = data.securitycode;
    this.creditCard.expirationDate = data.expirationdate;
    this.creditCard.cardFlag = data.cardflag;
  }

  savePaymentPlan() {
    if (this.index == 0) {
      this.plan.id = 1;
      
    }
    if (this.index == 1) {
      this.plan.id = 2;

    }
    if (this.index == 2) {
      this.plan.id = 3;
      
    }
    
  }


  saveUserData(data: any) {

    this.user.username = data.username;
    this.user.password = data.password;
    this.account.completeName = data.name + ' ' + data.surname;
    this.account.email = data.email;
    this.account.phone = data.phone.trim();
    this.account.address = data.address;
    this.account.city = data.city;
    this.account.stateDistrict = data.state;
    this.account.login = this.user;
    this.account.creditCard = this.creditCard;
    this.account.paymentPlan = this.plan;

    console.log(this.account);
    
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
    console.log(this.account);

    if (this.account !== undefined) {
      this.accountService.createAccount(this.account).subscribe(() => {
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
    this.user = {} as User;
    Object.keys(this.formGroup.controls).forEach(key => {
      this.formGroup.get(key).setErrors(null) ;
    });

  }

  delay(mms: number, message: string, isPaymentSuccessful?: boolean) {
    setTimeout(() => {
      this.processingMessage = message;
      if (isPaymentSuccessful) {
        this.router.navigate(['/user'], {
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

  getErrorSurname() {
    return this.formGroup.get('surname').hasError('required')? SENTENCES.FORM_ERROR[0].REQUIRED
      : this.formGroup.get('surname').hasError('minlength') ? SENTENCES.FORM_ERROR[0].FILL_CRITERIA
      : '';
  }

  getAddressError() {
    return this.formGroup.get('address').hasError('required')? SENTENCES.FORM_ERROR[0].REQUIRED
      : this.formGroup.get('address').hasError('minlength') ? SENTENCES.FORM_ERROR[0].FILL_CRITERIA
      : '';
  }

  getErrorPassword() {
    return this.formGroup.get('password').hasError('required') ? SENTENCES.FORM_ERROR[0].REQUIRED :
      this.formGroup.get('password').hasError('requirements') ? SENTENCES.FORM_ERROR[0].PASSWORD_NOT_VALID : '';
  }

  getErrorPasswordMissmatch() {
    let password = this.formGroup.get('password').value;
    console.log(password);

    let passwordConfirmation = this.formGroup.get('passwordconfirmation').value;
    console.log(passwordConfirmation);

    return password !== passwordConfirmation ? SENTENCES.FORM_ERROR[0].PASSWORD_MISSMATCH :
    this.formGroup.get('password').hasError('passwordconfirmation') ? SENTENCES.FORM_ERROR[0].REQUIRED :
    this.formGroup.get('password').hasError('passwordconfirmation') ? SENTENCES.FORM_ERROR[0].PASSWORD_NOT_VALID : '';
  }
}
