import { Component, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() cardholderName: string = '';
  @Input() cardNumber = '';
  @Input() cardMonth = '';
  @Input() cardYear = '';
 
  constructor() {}

 
}
