import { Injectable } from '@angular/core';
const DATA_DIRETORIO = `assets/data/`;
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}
  async getData(nomeArquivo: string) {
    let jsonData: any;
    await import(`../../../${DATA_DIRETORIO}${nomeArquivo}.json`).then(data => {
      jsonData = data;
    });
    return jsonData;
  }

  // getData(nomeArquivo: string) : Observable<any> {
  //   let caminho = `${DATA_DIRETORIO}${nomeArquivo}.json`;
  //   return this._http.get<any>(caminho);
  // }
}
