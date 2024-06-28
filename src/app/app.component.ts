import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  public title = '';
  public cardholderName: string = 'Christopher Quiroz';
  public cardNumber: string = '0000 0000 0000 0000';
  public cardMonth: string = '00';
  public cardYear: string = '00';

  constructor() {}

  updateCardInfo(cardInfo: 
    { name: string;
      cardNumber: string,
      cardMonth: string,
      cardYear: string
    }){

    if (cardInfo.name) {
      this.cardholderName = cardInfo.name;
    }
    if (cardInfo.cardNumber) {
      this.cardNumber = this.formatCardNumber(cardInfo.cardNumber);
    }

    if (cardInfo.cardMonth) {
      this.cardMonth = cardInfo.cardMonth;
    }

    if (cardInfo.cardYear) {
      this.cardYear = cardInfo.cardYear;
    }
 
  }

  private formatCardNumber(cardNumber: string): string {
    // Limpiar el número de tarjeta de espacios y formatear con espacios después de cada 4 dígitos
    const cleanedCardNumber = cardNumber.replace(/\s/g, '');
    const regex = /(\d{4})(?=\d)/g;
    return cleanedCardNumber.replace(regex, '$1 ');
  }

  resetCardInfo(): void {
    this.cardholderName = 'Christopher Quiroz';
    this.cardNumber = '0000 0000 0000 0000';
    this.cardMonth = '00';
    this.cardYear = '00';
  }
}
