import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StepperComponent {
  @Input() textoStep1: string;
  @Input() textoStep2: string;
  @Input() textoStep3: string;
  @Input() labelStep1: string;
  @Input() labelStep2: string;
  @Input() labelStep3: string;
  @Input() selecionadoStep1: boolean = false;
  @Input() selecionadoStep2: boolean = false;
  @Input() selecionadoStep3: boolean = false;
  @Output() onClickStep1 = new EventEmitter<any>();
  @Output() onClickStep2 = new EventEmitter<any>();
  @Output() onClickStep3 = new EventEmitter<any>();
  @Input() enviando: boolean;

  clickStep1(event: any) {
    this.onClickStep1.emit(event);
  }

  clickStep2(event: any) {
    this.onClickStep2.emit(event);
  }

  clickStep3(event: any) {
    this.onClickStep3.emit(event);
  }
}
