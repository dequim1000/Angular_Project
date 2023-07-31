import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isValidEmail } from 'src/app/helpers/validation/validation';
import { naoObrigatorioVazio } from './common-validator';

export class EmailValidator {
  static validar() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (naoObrigatorioVazio(control)) {
        return null;
      }

      if (!isValidEmail(control.value?.toString())) {
        let message = 'E-mail inválido!';
        if (control?.value != undefined && control?.value != '' && !control.value.includes('@')) {
          message = `Inclua um '@' no endereço de e-mail. "${control.value}" está com um "@" faltando.`;
        }

        return {
          emailValidator: true,
          message: message,
        };
      }

      return null;
    };
  }
}
