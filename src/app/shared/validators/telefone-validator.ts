import { AbstractControl, ValidationErrors } from '@angular/forms';
import { isValidPhone } from 'src/app/helpers/validation/validation';
import { naoObrigatorioVazio } from './common-validator';

export class TelefoneValidator {
  static validar() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (naoObrigatorioVazio(control)) {
        return null;
      }

      if (!isValidPhone(control.value?.toString())) {
        return {
          telefoneValidator: true,
          message: 'Telefone inválido!',
        };
      }
      return null;
    };
  }
}
