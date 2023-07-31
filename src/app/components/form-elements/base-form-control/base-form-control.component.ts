import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-base-form-control',
  templateUrl: './base-form-control.component.html',
  styleUrls: ['./base-form-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BaseFormControlComponent),
      multi: true,
    },
  ],
})
export class BaseFormControlComponent implements ControlValueAccessor, OnInit {
  @Input() fieldName: string;
  @Output() blur = new EventEmitter();

  value: string;
  isDisabled: boolean = false;
  form: FormGroup;

  onChange: (value: string) => void;
  touched: () => void;

  constructor(protected rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
    this.value = '';
  }

  writeValue(value: string) {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.touched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  get formField(): FormControl {
    return this.form?.get(this.fieldName) as FormControl;
  }

  onBlur() {
    this.touched();
    this.blur.emit();
  }

  handleEvent(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.onChange(value);
  }

  checkIfRequired() {
    let formControl = this.form?.get(this.fieldName);
    if (formControl && formControl.validator && formControl.validator({} as AbstractControl)?.['required']) {
      return true;
    }
    return false;
  }
}
