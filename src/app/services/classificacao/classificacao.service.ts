import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseResponse } from 'src/app/model/base-reponse/base-response.model';
import { ClassificacaoModel } from 'src/app/model/classificacao/classificacao.model';
import { environment } from 'src/environments/environment';

const API_URL = `${environment.api.url}/api/v1/Classificacao`;

@Injectable({
  providedIn: 'root',
})
export class ClassificacaoService {
  constructor(private http: HttpClient) {}

  getClassificacoes(): Observable<BaseResponse<ClassificacaoModel[]>> {
    return this.http.get<BaseResponse<ClassificacaoModel[]>>(API_URL);
  }
}
