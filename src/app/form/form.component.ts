import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  
  public myForm: FormGroup = this.fb.group( {
    name: ['', [ Validators.required, Validators.minLength(3) ]],
    number: ['', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(16) ]],
    card_month: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2),
      Validators.pattern('^[0-9]*$')
    ]],
    card_year: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(2),
      Validators.pattern('^[0-9]*$')
    ]],
    card_cvc: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3),
      Validators.pattern('^[0-9]*$')
    ]]
     
  });

  public showForm: boolean = true;
  public showThankYou: boolean = false;

  constructor( private fb: FormBuilder ){}



  isValidField( field: string ): boolean | null {
    return this.myForm.controls[field].errors
      && this.myForm.controls[field].touched;
  } 


  
  getFieldError( field: string ): string | null {
    const control = this.myForm.get(field);

    if (!control || !control.errors) return null;

    const errors = control.errors;

    for(const key of Object.keys(errors)) { 
      switch( key ) {
        case 'required':
          return 'This field is required';
        
        case 'minlength':
          return `Minimum  ${ errors['minlength'].requiredLength } characters.`;

        case 'maxlength':
          return `Maximum ${errors['maxlength'].requiredLength} characters`;

        case 'pattern':
          if (errors['pattern']?.requiredPattern === '^[0-9]*$') {
            return 'Only numbers are allowed';
          } else if (errors['pattern']?.requiredPattern === '^[0-9]{16}$') {
            return 'The field must be exactly 16 digits';
          }
      }
    }
    return null;
  }


  

  onSave(): void {

    if( this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    };
    //console.log(this.myForm.value);  
    this.showForm = false;
    this.showThankYou = true;
    
    this.myForm.reset({});

  }
}
