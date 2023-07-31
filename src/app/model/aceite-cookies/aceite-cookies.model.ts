export class AceiteCookiesModel {
  id: string;
  dispositivo: string;
  browser: string;
  ip: string;
  dataExibicao: Date;
  aceite: number;
  dataAceite: Date;
}

export class ExibiuCookiesInputModel {
  dispositivo: string;
  browser: string;
  ip: string;
}

export class AceitouRejeitouCookiesInputModel {
  id: string;
}

export class LocalStorageCookie {
  aceite: boolean;
  id: string;
}

export interface AvisoCookiesDTOModule {
  textoAviso: string;
  linkPolitica: string;
  textoBotaoRejeita: string;
  textoBotaoAceita: string;
}
export class IPModel {
  ip: string;
}
