import { Component, EventEmitter, Output } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-modal-aviso',
  templateUrl: './modal-aviso.component.html',
  styleUrls: ['./modal-aviso.component.scss'],
})
export class ModalAvisoComponent {
  @Output() onClose = new EventEmitter<any>();

  titulo: string;
  mensagem: string;
  erro: boolean;
  mensagemErroGenerica: string = 'Ocorreu um erro inesperado.';

  exibirModal(titulo: string, mensagem: string, erro: boolean = false): void {
    this.titulo = titulo;
    this.mensagem = mensagem;
    this.erro = erro;
    if (erro && (mensagem == undefined || mensagem == null || mensagem == '')) {
      this.mensagem = this.mensagemErroGenerica;
    }

    var modal = new bootstrap.Modal(document.getElementById('modal-aviso'), {});
    modal.show();
  }

  classErro(): string {
    return this.erro ? 'modal-aviso-erro' : '';
  }

  clickFechar(event: any): void {
    if (!this.erro) {
      this.onClose.emit(event);
    }
  }
}
