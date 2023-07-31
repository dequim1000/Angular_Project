import { ModalAvisoComponent } from './../../components/modal-aviso/modal-aviso.component';
import { CadastroService } from './../../services/cadastro/cadastro.service';
import {
  CadastroModel,
  DadosEmpresaModel,
  InformacaoFinanceiraModel,
  RepresentanteLegalModel,
} from './../../model/cadastro/cadastro.model';
import { CadastroStep3Component } from './../../components/cadastro-step3/cadastro-step3.component';
import { Component, ViewChild, OnInit } from '@angular/core';
import { BaseResponse } from 'src/app/model/base-reponse/base-response.model';
import { CadastroStep2Component } from 'src/app/components/cadastro-step2/cadastro-step2.component';
import { CadastroStep1Component } from 'src/app/components/cadastro-step1/cadastro-step1.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  @ViewChild(CadastroStep1Component) cadastroStepper1!: CadastroStep1Component;
  @ViewChild(CadastroStep2Component) cadastroStepper2!: CadastroStep2Component;
  @ViewChild(CadastroStep3Component) cadastroStepper3!: CadastroStep3Component;
  @ViewChild(ModalAvisoComponent) modalAviso: ModalAvisoComponent;

  model: CadastroModel = new CadastroModel();

  selecionadoStep1: boolean = true;
  selecionadoStep2: boolean = false;
  selecionadoStep3: boolean = false;
  tituloModal: string = 'Cadastro';
  enviando: boolean = false;

  constructor(private _cadastroService: CadastroService, private _router: Router) {}

  ngOnInit(): void {
    this.InicializaCadastroModel();
  }

  InicializaCadastroModel(): void {
    this.model = new CadastroModel();
    this.model.dadosEmpresa = {
      razaoSocial: '',
      idClassificacao: '',
      cnpj: null,
      dataConstituicao: null,
      cep: null,
      cidade: '',
      estado: '',
      endereco: '',
      numero: '',
      complemento: '',
    };
    this.model.informacoesFinanceiras = {
      dataBase: null,
      email: '',
      patrimonioLiquido: null,
      responsavel: '',
      telefone: null,
    };
    this.model.representantesLegais = [];
    this.model.tradersAutorizados = [];
    this.model.contrapartesPreAutorizadas = [];
    this.model.arquivos = [];
  }

  clickStep1() {
    this.persisteDados();
    this.selecionadoStep1 = true;
    this.selecionadoStep2 = false;
    this.selecionadoStep3 = false;
  }

  clickStep2() {
    this.persisteDados();
    this.selecionadoStep1 = false;
    this.selecionadoStep2 = true;
    this.selecionadoStep3 = false;
  }

  clickStep3() {
    this.persisteDados();
    this.selecionadoStep1 = false;
    this.selecionadoStep2 = false;
    this.selecionadoStep3 = true;
  }

  persisteDados(): void {
    if (this.selecionadoStep1) {
      this.cadastroStepper1.persistirDados();
    }

    if (this.selecionadoStep2) {
      this.cadastroStepper2.persistirDados();
    }

    if (this.selecionadoStep3) {
      this.cadastroStepper3.persistirDados();
    }
  }

  clickFinalizar() {
    this.persisteDados();
    this.enviarCadastro();
  }

  enviarCadastro() {
    this.enviando = true;
    this._cadastroService.postCadastro(this.model).subscribe({
      next: (cadastro: BaseResponse<string>) => {
        this.enviando = false;
        if (cadastro.sucesso) {
          this.modalAviso.exibirModal(
            this.tituloModal,
            `Cadastro realizado com sucesso!
Em breve retornaremos no seu e-mail.`
          );
        } else {
          this.modalAviso.exibirModal(this.tituloModal, cadastro.mensagem, true);
        }
      },
      error: (err: any) => {
        this.enviando = false;
        this.modalAviso.exibirModal(this.tituloModal, err.error?.Mensagem, true);
      },
    });
  }

  cadastroFinalizado(): void {
    this._router.navigate(['/home']);
  }
}
