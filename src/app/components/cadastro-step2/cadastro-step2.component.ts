import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { maskNumber } from 'src/app/helpers/common/mask';
import {
  ArquivoModel,
  CadastroModel,
  ContrapartePreAutorizadaModel,
  InformacaoFinanceiraModel,
  tipoCadastroTraderContraparteEnum,
  TraderAutorizadoModel,
} from 'src/app/model/cadastro/cadastro.model';
import { CnpjValidator } from 'src/app/shared/validators/cnpj-validator';
import { CpfValidator } from 'src/app/shared/validators/cpf-validator';
import { EmailValidator } from 'src/app/shared/validators/email-validator';
import { TelefoneValidator } from 'src/app/shared/validators/telefone-validator';
import { InputFileComponent } from '../form-elements/input-file/input-file.component';

@Component({
  selector: 'app-cadastro-step2',
  templateUrl: './cadastro-step2.component.html',
  styleUrls: ['./cadastro-step2.component.scss'],
})
export class CadastroStep2Component implements OnInit {
  @Input() model: CadastroModel;
  @ViewChildren(InputFileComponent) set content(content: QueryList<InputFileComponent>) {
    if (content.length) {
      this.arquivosInputs = content;
      if (this.model.cadastroTraderContraparteArquivo) this.preencherArquivoContraparte();
    }
  }

  arquivosInputs: QueryList<InputFileComponent>;
  form: FormGroup;

  exibirTraderAdicional: number[] = [];
  maximoTraderAdicional: number = 999;
  campoTraderNome: string = 'traderNome';
  campoTraderCpf: string = 'traderCpf';
  campoTraderEmail: string = 'traderEmail';
  tipoCadastroContraparteEnum = tipoCadastroTraderContraparteEnum;
  tipoCadastroContraParte = tipoCadastroTraderContraparteEnum.formulario;

  exibirContraparteAdicional: number[] = [];
  maximoContraparteAdicional: number = 999;
  campoContraparteNome: string = 'contraparteNome';
  campoContraparteCnpj: string = 'contraparteCnpj';
  campoContraparteLimite: string = 'contraparteLimite';
  campoContraparteLimiteMeses: string = 'contraparteLimiteMeses';
  campoContraparteLimiteVolume: string = 'contraparteLimiteVolume';

  mascaraCNPJ = '00.000.000/0000-00';
  mascaraTelefone: '(00) 0000-0000||(00) 00000-0000';
  mascaraCPF = '000.000.000-00';

  constructor(private _formBuilder: FormBuilder, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      patrimonioLiquido: ['', [], , { updateOn: 'blur' }],
      dataBase: ['', []],
      responsavel: ['', []],
      emailResponsavel: ['', [EmailValidator.validar()]],
      telefoneResponsavel: ['', [TelefoneValidator.validar()]],
      tipoCadastro: ['0', []],
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.preencherDados();
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  preencherDados(): void {
    if (this.model == undefined || this.model == null) {
      return;
    }
    if (this.model.tipoCadastroTraderContraparte) {
      this.tipoCadastroContraParte = this.model.tipoCadastroTraderContraparte;
      this.form.get('tipoCadastro')?.patchValue(this.tipoCadastroContraParte.toString());
    }

    if (this.model.informacoesFinanceiras != undefined && this.model.informacoesFinanceiras != null) {
      this.setMoeda(this.model.informacoesFinanceiras.patrimonioLiquido ?? 0, 'patrimonioLiquido');
      this.form.get('dataBase')?.patchValue(this.model.informacoesFinanceiras.dataBase);
      this.form.get('responsavel')?.patchValue(this.model.informacoesFinanceiras.responsavel);
      this.form.get('emailResponsavel')?.patchValue(this.model.informacoesFinanceiras.email);
      this.setNumero(this.model.informacoesFinanceiras.telefone ?? 0, 'telefoneResponsavel', this.mascaraTelefone);
    }

    if (
      this.model.tradersAutorizados != undefined &&
      this.model.tradersAutorizados != null &&
      this.model.tradersAutorizados.length > 0
    ) {
      for (let i = 0; i < this.model.tradersAutorizados.length; i++) {
        const indice = i + 1;
        this.addTrader();
        setTimeout(() => {
          this.form
            .get(this.campoTraderNome + indice.toString())
            ?.patchValue(this.model.tradersAutorizados[i].nomeCompleto);
          this.setNumero(
            this.model.tradersAutorizados[i].cpf ?? 0,
            this.campoTraderCpf + indice.toString(),
            this.mascaraCPF
          );
          this.form.get(this.campoTraderEmail + indice.toString())?.patchValue(this.model.tradersAutorizados[i].email);
        });
      }
    } else {
      this.addTrader();
    }

    if (
      this.model.contrapartesPreAutorizadas != undefined &&
      this.model.contrapartesPreAutorizadas != null &&
      this.model.contrapartesPreAutorizadas.length > 0
    ) {
        for (let i = 0; i < this.model.contrapartesPreAutorizadas.length; i++) {
            const indice = i + 1;
            this.addContraparte();
            setTimeout(() => {
                this.form
                    .get(this.campoContraparteNome + indice.toString())
                    ?.patchValue(this.model.contrapartesPreAutorizadas[i].razaoSocial);
                this.setNumero(
                    this.model.contrapartesPreAutorizadas[i].cnpj ?? 0,
                    this.campoContraparteCnpj + indice.toString(),
                    this.mascaraCNPJ
                );
                this.setMoeda(
                    this.model.contrapartesPreAutorizadas[i].limite ?? 0,
                    this.campoContraparteLimite + indice.toString()
                );
                this.form
                    .get(this.campoContraparteLimiteVolume + indice.toString())
                    ?.patchValue(this.model.contrapartesPreAutorizadas[i].limiteVolume);
                this.form
                    .get(this.campoContraparteLimiteMeses + indice.toString())
                    ?.patchValue(this.model.contrapartesPreAutorizadas[i].limiteMeses);
            });
        }
    } else {
      if (this.tipoCadastroContraParte == this.tipoCadastroContraparteEnum.formulario) this.addContraparte();
    }

    if (this.model.cadastroTraderContraparteArquivo) {
      this.preencherArquivoContraparte();
    }
  }

  preencherArquivoContraparte() {
    if (this.arquivosInputs)
      this.arquivosInputs.forEach((arquivoInput: InputFileComponent) => {
        let arquivoModel = this.model.cadastroTraderContraparteArquivo;
        if (arquivoModel) {
          arquivoInput.setArquivo(arquivoModel);
        }
      });
  }

  persistirDados(): void {
    if (this.model == undefined || this.model == null) {
      this.model = new CadastroModel();
    }

    if (this.tipoCadastroContraParte == this.tipoCadastroContraparteEnum.planilha) {
      let arquivo = this.getArquivos();
      if (arquivo) {
        this.model.cadastroTraderContraparteArquivo = arquivo[0];
      }
    }

    this.model.tipoCadastroTraderContraparte = this.tipoCadastroContraParte;

    if (this.model.informacoesFinanceiras == undefined || this.model.informacoesFinanceiras == null) {
      this.model.informacoesFinanceiras = new InformacaoFinanceiraModel();
    }

    this.model.informacoesFinanceiras.patrimonioLiquido = this.salvarFloat(this.form.get('patrimonioLiquido')?.value);
    this.model.informacoesFinanceiras.dataBase = this.form.get('dataBase')?.value;
    this.model.informacoesFinanceiras.responsavel = this.form.get('responsavel')?.value;
    this.model.informacoesFinanceiras.email = this.form.get('emailResponsavel')?.value;
    this.model.informacoesFinanceiras.telefone = this.salvarFloat(this.form.get('telefoneResponsavel')?.value);

    this.model.tradersAutorizados = [];
    for (let i = 0; i < this.exibirTraderAdicional.length; i++) {
      const valor = this.exibirTraderAdicional[i];
      const trader: TraderAutorizadoModel = {
        nomeCompleto: this.form.get(this.campoTraderNome + valor.toString())?.value,
        cpf: this.salvarFloat(this.form.get(this.campoTraderCpf + valor.toString())?.value),
        email: this.form.get(this.campoTraderEmail + valor.toString())?.value,
      };
      this.model.tradersAutorizados.push(trader);
    }

    this.model.contrapartesPreAutorizadas = [];
    for (let i = 0; i < this.exibirContraparteAdicional.length; i++) {
      const valor = this.exibirContraparteAdicional[i];
      const contraparte: ContrapartePreAutorizadaModel = {
        razaoSocial: this.form.get(this.campoContraparteNome + valor.toString())?.value,
        cnpj: this.salvarFloat(this.form.get(this.campoContraparteCnpj + valor.toString())?.value),
        limite: this.salvarFloat(this.form.get(this.campoContraparteLimite + valor.toString())?.value),
        limiteVolume: this.salvarFloat(this.form.get(this.campoContraparteLimiteVolume + valor.toString())?.value),
        limiteMeses: this.salvarFloat(this.form.get(this.campoContraparteLimiteMeses + valor.toString())?.value),
      };
      this.model.contrapartesPreAutorizadas.push(contraparte);
    }
  }

  changeTipoCadastroTraderContraparte(event: any) {
    this.tipoCadastroContraParte = parseInt(this.form.get('tipoCadastro')?.value);
    if (this.tipoCadastroContraParte == this.tipoCadastroContraparteEnum.formulario) {
      this.addContraparte();
      this.model.cadastroTraderContraparteArquivo = undefined;
    } else {
      this.exibirContraparteAdicional.forEach(item => {
        this.form.removeControl(this.campoContraparteNome + item.toString());
        this.form.removeControl(this.campoContraparteLimite + item.toString());
        this.form.removeControl(this.campoContraparteCnpj + item.toString());
        this.form.removeControl(this.campoContraparteLimiteVolume + item.toString());
        this.form.removeControl(this.campoContraparteLimiteMeses + item.toString());
      });
      this.exibirContraparteAdicional = [];
    }
  }

  downloadPlanilha() {
    window.open('assets/download/Lista_de_Contrapartes.xlsx', '_blank');
  }

  getArquivos(): ArquivoModel[] {
    let arquivos: ArquivoModel[] = [];
    this.arquivosInputs.forEach(arquivo => {
      if (arquivo.arquivo != undefined) {
        arquivos.push(arquivo.arquivo);
      }
    });
    return arquivos;
  }

  addTrader() {
    if (this.maximoTraders()) {
      return;
    }

    let ultimo = this.exibirTraderAdicional.length == 0 ? 0 : Math.max(...this.exibirTraderAdicional);
    let proximo = ultimo + 1;
    this.form.addControl(this.campoTraderNome + proximo.toString(), new FormControl('', []));

    var cpfControl = new FormControl('', { updateOn: 'blur' });
    cpfControl.setValidators([CpfValidator.validar()]);
    this.form.addControl(this.campoTraderCpf + proximo.toString(), cpfControl);

    this.form.addControl(
      this.campoTraderEmail + proximo.toString(),
      new FormControl('', [EmailValidator.validar()])
    );
    this.exibirTraderAdicional.push(proximo);
  }

  removerTrader(trader: number) {
    let indice = this.exibirTraderAdicional.indexOf(trader);
    if (indice > -1) {
      this.exibirTraderAdicional.splice(indice, 1);
    }
  }

  separadorAdicionalTrader(): boolean {
    if (this.exibirTraderAdicional.length > 1) {
      return true;
    }
    return false;
  }

  maximoTraders(): boolean {
    let ultimo = this.exibirTraderAdicional.length;
    if (ultimo >= this.maximoTraderAdicional) {
      return true;
    }
    return false;
  }

  addContraparte() {
    if (this.maximoContrapartes()) {
      return;
    }

    let ultimo = this.exibirContraparteAdicional.length == 0 ? 0 : Math.max(...this.exibirContraparteAdicional);
    let proximo = ultimo + 1;
    this.form.addControl(this.campoContraparteNome + proximo.toString(), new FormControl('', []));

    var cnpjControl = new FormControl('', { updateOn: 'blur' });
    cnpjControl.setValidators([CnpjValidator.validar()]);
    this.form.addControl(this.campoContraparteCnpj + proximo.toString(), cnpjControl);

    this.form.addControl(this.campoContraparteLimite + proximo.toString(), new FormControl('', []));
    this.form.addControl(this.campoContraparteLimiteVolume + proximo.toString(), new FormControl('', []));
    this.form.addControl(this.campoContraparteLimiteMeses + proximo.toString(), new FormControl('', []));
    this.exibirContraparteAdicional.push(proximo);
  }

  removerContraparte(contraparte: number) {
    let indice = this.exibirContraparteAdicional.indexOf(contraparte);
    if (indice > -1) {
      this.exibirContraparteAdicional.splice(indice, 1);
    }
  }

  separadorAdicionalContraparte(): boolean {
    if (this.exibirContraparteAdicional.length > 1) {
      return true;
    }
    return false;
  }

  maximoContrapartes(): boolean {
    let ultimo = this.exibirContraparteAdicional.length;
    if (ultimo >= this.maximoContraparteAdicional) {
      return true;
    }
    return false;
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

  setMoeda(valor: number, campo: string): void {
    if ((valor ?? 0) > 0) {
      const valorMask: string = valor.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      this.form.get(campo)?.patchValue(valorMask);
    } else {
      this.form.get(campo)?.patchValue('');
    }
  }

  formataValor(event: any, campo: string) {
    const valor: number = this.salvarFloat(this.form.get(campo)?.value);
    const valorStr: string = valor.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    this.form.get(campo)?.setValue(valorStr);
  }
}
