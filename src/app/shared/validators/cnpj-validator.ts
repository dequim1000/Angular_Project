import { AbstractControl, ValidationErrors } from '@angular/forms';
import { naoObrigatorioVazio } from './common-validator';
import { isValidCnpj } from 'src/app/helpers/validation/validation';

export class CnpjValidator {
  static validar() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (naoObrigatorioVazio(control)) {
        return null;
      }

      if (!isValidCnpj(control.value?.toString())) {
        return {
          cnpjValidator: true,
          message: 'cnpj inválido!',
        };
      }

      return null;
    };
  }
}
