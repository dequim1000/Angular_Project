import { Observable } from 'rxjs';
import { FaleConoscoInputModel } from './../../model/fale-conosco/fale-conosco.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResponse } from 'src/app/model/base-reponse/base-response.model';

const API_URL = `${environment.api.url}/api/v1/FaleConosco`;

@Injectable({
  providedIn: 'root',
})
export class FaleConoscoService {
  constructor(private http: HttpClient) {}

  postFaleConosco(model: FaleConoscoInputModel): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(API_URL, model);
  }
}
