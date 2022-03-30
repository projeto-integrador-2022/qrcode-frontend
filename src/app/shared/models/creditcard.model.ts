export class CreditCard {
  cardType: string;
  cardNumber: string;
  cardName: string;
  expirationDate: string;
  securityCode: number;
  isValid?: boolean;

  constructor(cardType: string, cardNumber: string, cardName: string, expirationDate: string, securityCode: number, isValid?: boolean) {
    this.cardType = cardType;
    this.cardNumber = cardNumber;
    this.cardName = cardName;
    this.expirationDate = expirationDate;
    this.securityCode = securityCode;   
    this.isValid = isValid;

  }
}
