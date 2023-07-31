import { Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ArquivoModel } from 'src/app/model/cadastro/cadastro.model';

@Component({
  selector: 'app-input-file',
  templateUrl: './input-file.component.html',
  styleUrls: ['./input-file.component.scss'],
})
export class InputFileComponent {
  @Input() id: string;
  @Input() label: string;
  @Input() required: boolean;
  @Input() tipoArquivo: number;
  @Input() accept: string = '.pdf';

  private textoNenhumArquivo: string = 'Nenhum arquivo escolhido';

  arquivo: ArquivoModel | null;

  requiredClass(): string {
    if (this.required) {
      return 'input-file-label-req';
    }
    return '';
  }

  getNomeArquivo(): string {
    if (this.arquivo == undefined || this.arquivo == null || this.arquivo.nome == '') {
      return this.textoNenhumArquivo;
    }

    return this.arquivo.nome;
  }

  mudouArquivo(e: any) {
    if (e.files != undefined && e.files != null && e.files.length > 0) {
      var file = e.files.item(0);
      this.transformarEmBase64(file)
        .then(arquivo => {
          this.arquivo = arquivo;
        })
        .catch(err => {
          this.arquivo = null;
        });
    }
  }

  transformarEmBase64(arquivo: File): Promise<ArquivoModel> {
    return new Promise<ArquivoModel>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        let retorno = {
          tipoArquivo: this.tipoArquivo,
          nome: arquivo.name,
          dataCriacao: new Date(arquivo.lastModified),
          bytes: base64,
        };
        resolve(retorno);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsDataURL(arquivo);
    });
  }

  setArquivo(arquivo: ArquivoModel): void {
    this.arquivo = arquivo;
  }
}
