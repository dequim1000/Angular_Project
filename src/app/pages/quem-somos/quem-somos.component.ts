import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { QuemSomosPageDTOModule } from 'src/app/model/quem-somos-dto/quem-somos-page-dto.model';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-quem-somos',
  templateUrl: './quem-somos.component.html',
  styleUrls: ['./quem-somos.component.scss'],
})
export class QuemSomosComponent {
  quemSomosPage$: Promise<QuemSomosPageDTOModule> = this._dataService.getData('quemSomosPage');

  constructor(private _dataService: DataService, private _domSanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
