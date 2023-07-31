import { AceiteCookiesService } from './../../services/aceite-cookies/aceite-cookies.service';
import { Component, OnInit } from '@angular/core';
import {
  AvisoCookiesDTOModule,
  ExibiuCookiesInputModel,
  IPModel,
  LocalStorageCookie,
} from 'src/app/model/aceite-cookies/aceite-cookies.model';
import { BaseResponse, BaseResponseSimple } from 'src/app/model/base-reponse/base-response.model';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-cookies-aceite',
  templateUrl: './cookies-aceite.component.html',
  styleUrls: ['./cookies-aceite.component.scss'],
})
export class CookiesAceiteComponent implements OnInit {
  inputModel: ExibiuCookiesInputModel = new ExibiuCookiesInputModel();
  aviso$: Promise<AvisoCookiesDTOModule> = this._dataService.getData('avisoCookies');
  cookieName: string = 'TPCookies';
  exibir: boolean = false;
  btnDesabilita: boolean = true;
  cookieId: string;

  constructor(
    private _dataService: DataService,
    private _aceiteCookiesService: AceiteCookiesService,
    private _deviceService: DeviceDetectorService
  ) {}

  ngOnInit(): void {
    this.verificarAceiteCookie();
  }

  verificarAceiteCookie() {
    if (!this.cookieId) {
      const aceiteCookie: any = localStorage.getItem(this.cookieName);
      if (!aceiteCookie) {
        this.exibir = true;
        this.cookieId = '';
        this.btnDesabilita = true;
        this.registraExibicao();
      } else {
        let cookie: LocalStorageCookie = JSON.parse(aceiteCookie);
        this.cookieId = cookie.id;
        this.exibir = false;
      }
    }
  }

  registraExibicao() {
    this._aceiteCookiesService.getIP().subscribe({
      next: (retorno: IPModel) => {
        this.inputModel.ip = retorno.ip;
      },
      error: (err: any) => {
        this.inputModel.ip = 'desconhecido';
      },
      complete: () => {
        const deviceInfo = this._deviceService.getDeviceInfo();
        this.inputModel.browser = `${deviceInfo.browser} ${deviceInfo.browser_version}`;
        this.inputModel.dispositivo = `${navigator.platform} ${deviceInfo.os_version}`;
        this.postExibiuCookies();
      },
    });
  }

  postExibiuCookies() {
    this._aceiteCookiesService.postExibiuCookie(this.inputModel).subscribe({
      next: (exibiu: BaseResponse<string>) => {
        this.cookieId = exibiu.retorno;
        this.btnDesabilita = false;
      },
    });
  }

  aceitaCookies() {
    if (this.cookieId == '') {
      return;
    }

    this._aceiteCookiesService.postAceitouCookie(this.cookieId).subscribe({
      next: (aceitou: BaseResponseSimple) => {
        if (aceitou.sucesso) {
          this.setCookieControle(true);
          this.exibir = false;
        }
      },
    });
  }

  rejeitaCookies() {
    if (this.cookieId == '') {
      return;
    }

    this._aceiteCookiesService.postRejeitouCookie(this.cookieId).subscribe({
      next: (aceitou: BaseResponseSimple) => {
        if (aceitou.sucesso) {
          this.setCookieControle(false);
          this.exibir = false;
        }
      },
    });
  }

  setCookieControle(aceitou: boolean): void {
    let cookie: LocalStorageCookie = {
      aceite: aceitou,
      id: this.cookieId,
    };
    var json = JSON.stringify(cookie);
    localStorage.setItem(this.cookieName, json);
  }

  exibirAviso() {
    return this.exibir;
  }

  botaoDesabilitado() {
    return this.btnDesabilita;
  }
}
