import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CadastroInputModel } from 'src/app/model/cadastro/cadastro.model';
import { environment } from 'src/environments/environment';
import { BaseResponse } from 'src/app/model/base-reponse/base-response.model';

const API_URL = `${environment.api.url}/api/v1/Cadastro`;

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  constructor(private http: HttpClient) {}

  postCadastro(model: CadastroInputModel): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(API_URL, model);
  }
}
