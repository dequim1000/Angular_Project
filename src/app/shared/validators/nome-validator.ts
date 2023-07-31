import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isValidName } from 'src/app/helpers/validation/validation';
import { naoObrigatorioVazio } from './common-validator';

export class NomeValidator {
  static validar() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (naoObrigatorioVazio(control)) {
        return null;
      }

      if (!isValidName(control.value?.toString())) {
        return {
          nomeValidator: true,
          message: 'Texto inválido para esse campo!',
        };
      }

      return null;
    };
  }
}
