import { Component, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() cardholderName: string = '';
  @Input() cardNumber: string = '';
  @Input() cardMonth: string = '';
  @Input() cardYear: string = '';
  @Input() cardCvc: string = '';
 
  constructor() {}

 
}
