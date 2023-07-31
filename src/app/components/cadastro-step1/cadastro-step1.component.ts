import { Component, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, Validators, FormControl } from '@angular/forms';
import { isValidCEP, isValidEmail, isValidName, isValidPhone } from 'src/app/helpers/validation/validation';
import { ModalAvisoComponent } from 'src/app/components/modal-aviso/modal-aviso.component';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/model/base-reponse/base-response.model';
import { ClassificacaoModel } from 'src/app/model/classificacao/classificacao.model';
import { ClassificacaoService } from 'src/app/services/classificacao/classificacao.service';
import { CepService } from 'src/app/services/cep/cep.service';
import { CnpjValidator } from 'src/app/shared/validators/cnpj-validator';
import { CEPValidator } from 'src/app/shared/validators/cep-validator';
import { CadastroModel, DadosEmpresaModel, RepresentanteLegalModel } from 'src/app/model/cadastro/cadastro.model';
import { CpfValidator } from 'src/app/shared/validators/cpf-validator';
import { EmailValidator } from 'src/app/shared/validators/email-validator';
import { InputComponent } from '../form-elements/input/input.component';
import { maskNumber } from 'src/app/helpers/common/mask';
import { SelectComponent } from '../form-elements/select/select.component';

@Component({
  selector: 'app-cadastro-step1',
  templateUrl: './cadastro-step1.component.html',
  styleUrls: ['./cadastro-step1.component.scss'],
})
export class CadastroStep1Component implements OnInit {
  @Input() model: CadastroModel;

  classificacaoObservable$: Observable<BaseResponse<ClassificacaoModel[]>> =
    this._classificacaoService.getClassificacoes();
  @ViewChild(ModalAvisoComponent) modalAviso: ModalAvisoComponent;
  @ViewChild(SelectComponent) selectClassificacao: SelectComponent;

  form: FormGroup;
  modalTitle: string = 'Cadastro';
  idEnderecoDisabled: boolean = true;

  exibirRepresentanteLegalAdicional: number[] = [];
  maximoRepresentanteLegalAdicional: number = 999;
  campoRepresentanteLegalNome: string = 'representanteLegalNome';
  campoRepresentanteLegalCpf: string = 'representanteLegalCpf';
  campoRepresentanteLegalEmail: string = 'representanteLegalEmail';

  mascaraCNPJ = '00.000.000/0000-00';
  mascaraCEP = '00000-000';
  mascaraCPF = '000.000.000-00';

  constructor(
    private _formBuilder: FormBuilder,
    private _classificacaoService: ClassificacaoService,
    private _cepService: CepService
  ) {}

  formField(fieldName: string): FormControl {
    return this.form?.get(fieldName) as FormControl;
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      razaoSocial: [''],
      idClassificacao: [''],
      cnpj: [[CnpjValidator.validar()], { updateOn: 'blur' }],
      dataConstituicao: [],
      cep: [[CEPValidator.validar()], { updateOn: 'blur' }],
      cidade: [{ value: '', disabled: true }],
      estado: [{ value: '', disabled: true }],
      endereco: [{ value: '', disabled: true }],
      numero: [''],
      complemento: [''],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.preencherDados();
    });
  }

  preencherDados(): void {
    if (this.model == undefined || this.model == null) {
      return;
    }

    if (this.model.dadosEmpresa != undefined && this.model.dadosEmpresa != null) {
      this.form.get('razaoSocial')?.setValue(this.model.dadosEmpresa.razaoSocial);
      this.form.get('idClassificacao')?.setValue(this.model.dadosEmpresa.idClassificacao);
      this.setNumero(this.model.dadosEmpresa.cnpj ?? 0, 'cnpj', this.mascaraCNPJ);
      this.form.get('dataConstituicao')?.setValue(this.model.dadosEmpresa.dataConstituicao);
      this.setNumero(this.model.dadosEmpresa.cep ?? 0, 'cep', this.mascaraCEP);
      this.form.get('cidade')?.setValue(this.model.dadosEmpresa.cidade);
      this.form.get('estado')?.setValue(this.model.dadosEmpresa.estado);
      this.form.get('endereco')?.setValue(this.model.dadosEmpresa.endereco);
      this.form.get('numero')?.setValue(this.model.dadosEmpresa.numero);
      this.form.get('complemento')?.setValue(this.model.dadosEmpresa.complemento);
    }

    if (
      this.model.representantesLegais != undefined &&
      this.model.representantesLegais != null &&
      this.model.representantesLegais.length > 0
    ) {
      for (let i = 0; i < this.model.representantesLegais.length; i++) {
        const indice = i + 1;
        this.addRepresentanteLegal();
        setTimeout(() => {
          this.form
            .get(this.campoRepresentanteLegalNome + indice.toString())
            ?.setValue(this.model.representantesLegais[i].nomeCompleto);
          this.setNumero(
            this.model.representantesLegais[i].cpf ?? 0,
            this.campoRepresentanteLegalCpf + indice.toString(),
            this.mascaraCPF
          );
          this.form
            .get(this.campoRepresentanteLegalEmail + indice.toString())
            ?.setValue(this.model.representantesLegais[i].email);
        });
      }
    } else {
      this.addRepresentanteLegal();
    }
  }

  persistirDados(): void {
    if (this.model == undefined || this.model == null) {
      this.model = new CadastroModel();
    }

    if (this.model.dadosEmpresa == undefined || this.model.dadosEmpresa == null) {
      this.model.dadosEmpresa = new DadosEmpresaModel();
    }
    this.model.dadosEmpresa.razaoSocial = this.form.get('razaoSocial')?.value;
    this.model.dadosEmpresa.idClassificacao = this.form.get('idClassificacao')?.value;
    this.model.dadosEmpresa.cnpj = this.salvarFloat(this.form.get('cnpj')?.value);
    this.model.dadosEmpresa.dataConstituicao = this.form.get('dataConstituicao')?.value;
    this.model.dadosEmpresa.cep = this.salvarFloat(this.form.get('cep')?.value);
    this.model.dadosEmpresa.cidade = this.form.get('cidade')?.value;
    this.model.dadosEmpresa.estado = this.form.get('estado')?.value;
    this.model.dadosEmpresa.endereco = this.form.get('endereco')?.value;
    this.model.dadosEmpresa.numero = this.form.get('numero')?.value;
    this.model.dadosEmpresa.complemento = this.form.get('complemento')?.value;

    this.model.representantesLegais = [];
    for (let i = 0; i < this.exibirRepresentanteLegalAdicional.length; i++) {
      const valor = this.exibirRepresentanteLegalAdicional[i];
      const representanteLegal: RepresentanteLegalModel = {
        nomeCompleto: this.form.get(this.campoRepresentanteLegalNome + valor.toString())?.value,
        cpf: this.salvarFloat(this.form.get(this.campoRepresentanteLegalCpf + valor.toString())?.value),
        email: this.form.get(this.campoRepresentanteLegalEmail + valor.toString())?.value,
      };
      this.model.representantesLegais.push(representanteLegal);
    }
  }

  addRepresentanteLegal() {
    if (this.maximoRepresentantesLegais()) {
      return;
    }

    let ultimo =
      this.exibirRepresentanteLegalAdicional.length == 0 ? 0 : Math.max(...this.exibirRepresentanteLegalAdicional);
    let proximo = ultimo + 1;
    this.form.addControl(
      this.campoRepresentanteLegalNome + proximo.toString(),
      new FormControl('', [])
    );

    var cpfControl = new FormControl('', { updateOn: 'blur' });
    cpfControl.setValidators([CpfValidator.validar()]);
    this.form.addControl(this.campoRepresentanteLegalCpf + proximo.toString(), cpfControl);

    this.form.addControl(
      this.campoRepresentanteLegalEmail + proximo.toString(),
      new FormControl('', [EmailValidator.validar()])
    );
    this.exibirRepresentanteLegalAdicional.push(proximo);
  }

  removerRepresentanteLegal(representanteLegal: number) {
    let indice = this.exibirRepresentanteLegalAdicional.indexOf(representanteLegal);
    if (indice > -1) {
      this.exibirRepresentanteLegalAdicional.splice(indice, 1);
    }
  }

  separadorAdicionalRepresentanteLegal(): boolean {
    if (this.exibirRepresentanteLegalAdicional.length > 1) {
      return true;
    }
    return false;
  }

  maximoRepresentantesLegais(): boolean {
    let ultimo = this.exibirRepresentanteLegalAdicional.length;
    if (ultimo >= this.maximoRepresentanteLegalAdicional) {
      return true;
    }
    return false;
  }

  onCEPBlur() {
    if (isValidCEP(this.form.get('cep')?.getRawValue())) {
      this._cepService.getCEP(parseInt(this.form.get('cep')?.getRawValue().replace('-', ''))).subscribe(
        (response: any) => {
          this.form.get('cidade')?.patchValue(response.retorno.cidade);
          this.form.get('estado')?.patchValue(response.retorno.estado);
          this.form.get('endereco')?.patchValue(response.retorno.endereco);

          if (response.retorno.endereco.length == 0) {
            this.form.get('endereco')?.enable();
          } else {
            this.form.get('endereco')?.disable();
          }
        },
        (response: any) => {
          this.form.get('endereco')?.enable();
          this.form.get('cidade')?.patchValue('');
          this.form.get('estado')?.patchValue('');
          this.form.get('endereco')?.patchValue('');
          this.form.get('endereco')?.disable();
          this.modalAviso.exibirModal(this.modalTitle, `O CEP digitado não é válido.`, true);
        }
      );
    }
  }

  salvarFloat(valor: any): number {
    if (valor == undefined || valor == null) {
      return 0;
    }
    let valorSemChar = valor.toString().replace(/[^\d,]/g, '');
    valorSemChar = valorSemChar.replace(',', '.');
    if (valorSemChar == undefined || valorSemChar == null || valorSemChar.trim() == '') {
      return 0;
    }

    return parseFloat(valorSemChar);
  }

  setNumero(valor: number, campo: string, mask: string): void {
    if ((valor ?? 0) > 0) {
      const valorMask: string = maskNumber(valor.toString(), mask);
      this.form.get(campo)?.patchValue(valorMask);
    } else {
      this.form.get(campo)?.patchValue('');
    }
  }
}
