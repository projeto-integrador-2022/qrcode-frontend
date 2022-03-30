import { CreditCard } from 'src/app/shared/models/creditcard.model';

export class BillingDetails {
  userName: string;
  name: string;
  surname: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  city: string;
  state: string;
  creditCard: CreditCard;
  plan: string;
  price: number;

  constructor(
    username: string,
    name: string,
    surname: string,
    email: string,
    phone: string,
    address: string,
    password: string,
    city: string,
    state: string,
    creditCard: CreditCard,
    plan: string,
    price: number
  ) {
    this.userName = username;
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.password = password;
    this.city = city;
    this.state = state;
    this.creditCard = creditCard;
    this.plan = plan;
    this.price = price;
  }
}
