import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseResponse } from 'src/app/model/base-reponse/base-response.model';
import { CepModel } from 'src/app/model/cep/cep.model';

const API_URL = `${environment.api.url}/api/v1/CEP`;

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private http: HttpClient) {}

  getCEP(cep: number): Observable<BaseResponse<CepModel>> {
    const url = `${API_URL}/${cep}`;
    return this.http.get<BaseResponse<CepModel>>(url);
  }
}
