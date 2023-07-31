import { ISelectItemModel } from '../form-elements/select-item.model';

export class InteresseModel implements ISelectItemModel {
  id: string;
  descricao: string;
  ativo: boolean;
}
