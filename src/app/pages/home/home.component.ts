import { DataService } from './../../services/data/data.service';
import { Component } from '@angular/core';
import { HomePageDTOModule } from 'src/app/model/home-page-dto/home-page-dto.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  homePage$: Promise<HomePageDTOModule> = this._dataService.getData('homePage');
  constructor(private _dataService: DataService, private _domSanitizer: DomSanitizer) {}
  transform(url: string = ''): SafeResourceUrl {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
