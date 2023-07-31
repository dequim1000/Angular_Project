import { AbstractControl } from '@angular/forms';

export function naoObrigatorioVazio(control: AbstractControl): boolean {
  let obrigatorio = control.hasOwnProperty('required');
  if (control?.value != undefined && control?.value.toString().trim().length == 0 && !obrigatorio) {
    return true;
  }
  return false;
}
