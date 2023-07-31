import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-field-erros',
  templateUrl: './field-erros.component.html',
  styleUrls: ['./field-erros.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FieldErrosComponent {
  @Input()
  public formField: FormControl;

  @Input()
  public formFieldName: string = '';

  @Input()
  public customStyle: object = {};

  constructor() {}
  ngOnInit() {}

  displayErrorMessage() {
    if (this.formField.errors) return this.formField.errors['message'] as string;
    return '';
  }

  capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
