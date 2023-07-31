import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-botao-stepper',
  templateUrl: './botao-stepper.component.html',
  styleUrls: ['./botao-stepper.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BotaoStepperComponent {
  @Input() texto: string;
  @Input() selecionado: boolean = false;
  @Output() onClickEvent = new EventEmitter<any>();
  @Input() disabled: boolean;

  onClick(event: any) {
    this.onClickEvent.emit(event);
  }
}
