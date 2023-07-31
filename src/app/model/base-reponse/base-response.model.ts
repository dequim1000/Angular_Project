export class BaseResponseSimple {
  sucesso: boolean;
  mensagem: string;
}

export class BaseResponse<T> extends BaseResponseSimple {
  retorno: T;
}
