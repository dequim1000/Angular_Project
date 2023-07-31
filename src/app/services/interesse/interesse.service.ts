import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InteresseModel } from 'src/app/model/interesse/interesse.model';
import { BaseResponse } from 'src/app/model/base-reponse/base-response.model';

const API_URL = `${environment.api.url}/api/v1/Interesse`;

@Injectable({
  providedIn: 'root',
})
export class InteresseService {
  constructor(private http: HttpClient) {}

  getInteresses(): Observable<BaseResponse<InteresseModel[]>> {
    return this.http.get<BaseResponse<InteresseModel[]>>(API_URL);
  }
}
