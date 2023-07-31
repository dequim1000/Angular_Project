import { Component, Input, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, map, tap } from 'rxjs';
import { BaseResponse } from 'src/app/model/base-reponse/base-response.model';
import { ISelectItemModel } from 'src/app/model/form-elements/select-item.model';
import { BaseFormControlComponent } from '../base-form-control/base-form-control.component';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent extends BaseFormControlComponent {
  @Input() label: string;
  @Input() dados$: Observable<BaseResponse<ISelectItemModel[]>>;

  dadosLista$: Observable<ISelectItemModel[]>;
  dados: ISelectItemModel[];
  carregando: boolean = true;
  valorSelecionado: ISelectItemModel;
  idInicial: string;

  override ngOnInit(): void {
    this.popularLista();
    super.ngOnInit();
  }

  popularLista() {
    this.carregando = true;
    this.dadosLista$ = this.dados$.pipe(
      map((classificacoes: BaseResponse<ISelectItemModel[]>) => {
        if (classificacoes.sucesso) {
          return classificacoes.retorno.map((origem: any) => {
            const selectItem: ISelectItemModel = {
              id: origem.id,
              descricao: origem.descricao,
            };
            return selectItem;
          });
        } else {
          return [];
        }
      }),
      tap((dados: any) => {
        this.carregando = false;
        this.dados = dados;
        if (dados != undefined && dados.length > 0) {
          if (this.idInicial != undefined && this.idInicial != null && this.idInicial != '') {
            this.onChangeSelect(this.idInicial);
          } else {
            this.onChangeSelect(dados[0].id);
          }
        }
      })
    );
  }

  onChangeSelect(value: any) {
    this.onChange(value);
    this.touched();
  }
}
