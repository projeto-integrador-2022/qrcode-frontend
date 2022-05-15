import { CreditCard } from './creditcard';
import { User } from './user.model';
import { PaymentPlan } from './payment-plan';


export interface Account {
    completeName: string;
    email: string;
    phone: string;
    stateDistrict: string;
    city: string;
    address: string;

    login: User
    creditCard: CreditCard;

    paymentPlan: PaymentPlan;   
}
