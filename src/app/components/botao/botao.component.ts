import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-botao',
  templateUrl: './botao.component.html',
  styleUrls: ['./botao.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class BotaoComponent {
  @Input() texto: string;
  @Input() disabled: boolean;
  @Input() setaEsquerda: boolean = false;
  @Input() setaDireita: boolean = false;
  @Input() botaoMaior: boolean = false;
  @Input() tipo: string = 'button';
  @Output() onClickEvent = new EventEmitter<any>();

  onClick(event: any) {
    this.onClickEvent.emit(event);
  }
}
