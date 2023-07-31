import {
  ExibiuCookiesInputModel,
  AceitouRejeitouCookiesInputModel,
  IPModel,
} from './../../model/aceite-cookies/aceite-cookies.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResponse, BaseResponseSimple } from 'src/app/model/base-reponse/base-response.model';
import { AceiteCookiesModel } from 'src/app/model/aceite-cookies/aceite-cookies.model';

const API_URL = `${environment.api.url}/api/v1/AceiteCookie`;
const IP_URL = `${environment.api.ip_url}`;

@Injectable({
  providedIn: 'root',
})
export class AceiteCookiesService {
  constructor(private http: HttpClient) {}

  getIP(): Observable<IPModel> {
    return this.http.get<IPModel>(IP_URL);
  }

  getAceiteCookie(id: string): Observable<BaseResponse<AceiteCookiesModel>> {
    const url = `${API_URL}/${id}`;
    return this.http.get<BaseResponse<AceiteCookiesModel>>(url);
  }

  postExibiuCookie(model: ExibiuCookiesInputModel): Observable<BaseResponse<string>> {
    const url = `${API_URL}/exibiu`;
    return this.http.post<BaseResponse<string>>(url, model);
  }

  postAceitouCookie(id: string): Observable<BaseResponseSimple> {
    const url = `${API_URL}/aceitou`;
    let model = new AceitouRejeitouCookiesInputModel();
    model.id = id;
    return this.http.post<BaseResponseSimple>(url, model);
  }

  postRejeitouCookie(id: string): Observable<BaseResponseSimple> {
    const url = `${API_URL}/rejeitou`;
    let model = new AceitouRejeitouCookiesInputModel();
    model.id = id;
    return this.http.post<BaseResponseSimple>(url, model);
  }
}
