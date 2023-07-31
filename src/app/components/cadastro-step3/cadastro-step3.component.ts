import { ArquivoModel, CadastroModel } from './../../model/cadastro/cadastro.model';
import { InputFileComponent } from '../form-elements/input-file/input-file.component';
import { Component, Input, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-cadastro-step3',
  templateUrl: './cadastro-step3.component.html',
  styleUrls: ['./cadastro-step3.component.scss'],
})
export class CadastroStep3Component {
  @Input() model: CadastroModel;

  @ViewChildren(InputFileComponent)
  arquivosInputs!: QueryList<InputFileComponent>;

  listaArquivos: any[] = [
    {
      tipoArquivo: 0,
      descricao: 'CONTRATO/ESTATUTO SOCIAL',
      obrigatorio: false,
    },
    {
      tipoArquivo: 1,
      descricao: 'DOC.ID DO(S) REPRESENTANTE(S)',
      obrigatorio: false,
    },
    {
      tipoArquivo: 2,
      descricao: 'ÚLTIMO BALANÇO AUDITADO',
      obrigatorio: false,
    },
    {
      tipoArquivo: 3,
      descricao: 'ORGANOGRAMA SOCIETÁRIO',
      obrigatorio: false,
    },
    {
      tipoArquivo: 4,
      descricao: 'ATA ELEIÇÃO DIRETORIA (Se Aplicável)',
      obrigatorio: false,
    },
    {
      tipoArquivo: 5,
      descricao: 'PROCURAÇÃO (Se Aplicável)',
      obrigatorio: false,
    },
  ];
  arrayFor: number[] = [0, 2, 4];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.preencherDados();
    });
  }

  preencherDados(): void {
    if (this.model == undefined || this.model == null) {
      return;
    }

    if (this.model.arquivos != undefined && this.model.arquivos != null && this.model.arquivos.length > 0) {
      this.arquivosInputs.forEach((arquivoInput: InputFileComponent) => {
        let arquivoModel = this.model.arquivos.find(a => a.tipoArquivo == arquivoInput.tipoArquivo);
        if (arquivoModel != undefined && arquivoModel != null) {
          arquivoInput.setArquivo(arquivoModel);
        }
      });
    }
  }

  persistirDados(): void {
    let arquivos = this.getArquivos();
    this.model.arquivos = arquivos;
  }

  arrayCol(i: number): number[] {
    return [i, i + 1];
  }

  getArquivos(): ArquivoModel[] {
    let arquivos: ArquivoModel[] = [];

    // TODO: Validar arquivos obrigatórios
    this.arquivosInputs.forEach(arquivo => {
      if (arquivo.arquivo != undefined) {
        arquivos.push(arquivo.arquivo);
      }
    });

    return arquivos;
  }
}
