import { Component } from '@angular/core';
import { ContatoPageDTO } from 'src/app/model/contato-page-dto/contato-page-dto.model';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss'],
})
export class ContatoComponent {
  contatoPage$: Promise<ContatoPageDTO> = this._dataService.getData('contatoPage');
  constructor(private _dataService: DataService) {}
}
