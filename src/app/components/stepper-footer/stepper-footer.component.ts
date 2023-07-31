import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'app-stepper-footer',
  templateUrl: './stepper-footer.component.html',
  styleUrls: ['./stepper-footer.component.scss'],
})
export class StepperFooterComponent implements OnChanges {
  @Input() selecionadoStep1: boolean = false;
  @Input() selecionadoStep2: boolean = false;
  @Input() selecionadoStep3: boolean = false;

  @Output() onClickStep1 = new EventEmitter<any>();
  @Output() onClickStep2 = new EventEmitter<any>();
  @Output() onClickStep3 = new EventEmitter<any>();
  @Output() onClickBotaoFinalizar = new EventEmitter<any>();

  textoBotao1: string;
  setaBotao1: boolean;
  textoBotao2: string;
  setaBotao2: boolean;

  textoCancelar: string = 'CANCELAR';
  textoVoltar: string = 'VOLTAR';
  textoProximo: string = 'PRÓXIMO';
  textoFinalizar: string = 'FINALIZAR';

  constructor(private _router: Router) {}

  ngOnChanges(): void {
    this.atualizarTextos();
  }

  atualizarTextos(): void {
    if (this.selecionadoStep1) {
      this.textoBotao1 = this.textoCancelar;
      this.setaBotao1 = false;
      this.textoBotao2 = this.textoProximo;
      this.setaBotao2 = true;
    }

    if (this.selecionadoStep2) {
      this.textoBotao1 = this.textoVoltar;
      this.setaBotao1 = true;
      this.textoBotao2 = this.textoProximo;
      this.setaBotao2 = true;
    }

    if (this.selecionadoStep3) {
      this.textoBotao1 = this.textoVoltar;
      this.setaBotao1 = true;
      this.textoBotao2 = this.textoFinalizar;
      this.setaBotao2 = false;
    }
  }

  clickBotao1(event: any) {
    if (this.selecionadoStep1) {
      this._router.navigate(['/home']);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else if (this.selecionadoStep2) {
      this.onClickStep1.emit(event);
    } else {
      this.onClickStep2.emit(event);
    }
  }

  clickBotao2(event: any) {
    if (this.selecionadoStep1) {
      this.onClickStep2.emit(event);
    } else if (this.selecionadoStep2) {
      this.onClickStep3.emit(event);
    } else {
      this.onClickBotaoFinalizar.emit(event);
    }
  }
}
