import { AbstractControl, ValidationErrors } from '@angular/forms';

export function noNumbersValidator(control: AbstractControl): ValidationErrors | null {
  const hasNumbers = /\d/.test(control.value);
  return hasNumbers ? { noNumbers: true } : null;
}