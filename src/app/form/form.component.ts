import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
  public myForm!: FormGroup;
  public showForm: boolean = true;
  public showThankYou: boolean = false;


  @Output() cardInfoChange = new EventEmitter<{
    name: string;
    cardNumber: string;
    cardMonth: string;
    cardYear: string;
    cardCvc: string;
  }>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
          Validators.pattern('^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$'),
          
        ],
      ],
      number: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      card_month: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      card_year: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
      card_cvc: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3),
          Validators.pattern('^[0-9]*$'),
        ],
      ],
    });

    this.myForm.valueChanges.subscribe((value) => {
      const name = value.name || '';
      const cardNumber = this.formatCardNumber(value.number);
      const cardMonth = value.card_month || '';
      const cardYear = value.card_year || '';
      const cardCvc = value.card_cvc || '';

      this.cardInfoChange.emit({ name, cardNumber, cardMonth, cardYear, cardCvc });
    });
  }

  private formatCardNumber(cardnumber: string | null): string {
    if (!cardnumber) return '';

    const cleanedValue = cardnumber.replace(/\s/g, ''); // Delete spaces
    const regex = /(\d{4})(?=\d)/g;
    return cleanedValue.replace(regex, '$1 ').trim(); // Add spaces after every 4 digits
  }

  isValidField(field: string): boolean | null {
    return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    const control = this.myForm.get(field);

    if (!control || !control.errors) return null;

    const errors = control.errors;

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'This field is required';

        case 'minlength':
          return `Minimum ${errors['minlength'].requiredLength} characters.`;

        case 'maxlength':
          return `Maximum ${errors['maxlength'].requiredLength} characters`;

        case 'pattern':
          const requiredPattern = errors['pattern']?.requiredPattern;

          if (requiredPattern === '^[0-9]*$') {
            return 'Only numbers are allowed.';
          } else if (requiredPattern === '^[0-9]{16}$') {
            return 'The field must be exactly 16 digits.';
          } else if (requiredPattern === '^[a-zA-ZñÑáéíóúÁÉÍÓÚ ]*$') {
            return 'Only letters allowed.';
          }
          break;
      }
    }
    return null;
  }

  onSave(): void {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // Emitir cambios al componente Padre ( app.component )
    this.showForm = false;
    this.showThankYou = true;
  }

  onContinue(): void {
    this.showForm = true;
    this.showThankYou = false;
    this.resetForm();
    this.emitInitialValues();
  }

  // Reset form
  private resetForm(): void {
    this.myForm.reset({})
  }
  
  private emitInitialValues(): void {
    this.cardInfoChange.emit({
      name: 'Christopher Quiroz',
      cardNumber: '0000 0000 0000 0000',
      cardMonth: '00',
      cardYear: '00',
      cardCvc: '123'
    });
  }
}
