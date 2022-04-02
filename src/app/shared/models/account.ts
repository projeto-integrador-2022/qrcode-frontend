import { CreditCard } from './creditcard';
import { Login } from './login';
import { PaymentPlan } from './payment-plan';


export interface Account {
    id?: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    stateDistrict: string;

    paymentPlan?: PaymentPlan;
    creditCard?: CreditCard;
    login?: Login
}
