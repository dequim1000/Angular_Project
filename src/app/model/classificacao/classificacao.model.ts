import { ISelectItemModel } from '../form-elements/select-item.model';

export class ClassificacaoModel implements ISelectItemModel {
  id: string;
  descricao: string;
  ativo: boolean;
}
