import { AbstractControl, ValidationErrors } from '@angular/forms';
import { naoObrigatorioVazio } from './common-validator';
import { isValidCEP } from 'src/app/helpers/validation/validation';

export class CEPValidator {
  static validar() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (naoObrigatorioVazio(control)) {
        return null;
      }

      if (!isValidCEP(control.value?.toString())) {
        return {
          cepValidator: true,
          message: 'CEP inválido!',
        };
      }

      return null;
    };
  }
}
