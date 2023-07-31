import { AbstractControl, ValidationErrors } from '@angular/forms';
import { naoObrigatorioVazio } from './common-validator';
import { isValidCpf } from 'src/app/helpers/validation/validation';

export class CpfValidator {
  static validar() {
    return (control: AbstractControl): ValidationErrors | null => {
      if (naoObrigatorioVazio(control)) {
        return null;
      }

      if (!isValidCpf(control.value?.toString())) {
        return {
          cpfValidator: true,
          message: 'cpf inválido!',
        };
      }

      return null;
    };
  }
}
