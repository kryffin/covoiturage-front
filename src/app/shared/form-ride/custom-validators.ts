import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static date(control: AbstractControl): ValidationErrors | null {
    // returns control
    return /^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.]\d\d\d\d$/.test(control.value) ? null : {
      date: true
    };
  }
}
