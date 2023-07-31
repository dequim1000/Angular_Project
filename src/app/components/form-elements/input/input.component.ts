import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent extends BaseFormControlComponent {
  @Input() label: string;
  @Input() type: string = 'text';
  @Input() mascara: string;
  @Input() mascaraSeparadorMilhar: string;
  @Input() mascaraSeparadorDecimal: '.' | ',';
  @Input() mascaraDropSpecialChar: boolean;
  @Input() required: boolean;

  @Output() blurCallback = new EventEmitter<any>();

  onBlurInput(event: any) {
    this.onBlur();
    this.blurCallback.emit(event);
  }
}
