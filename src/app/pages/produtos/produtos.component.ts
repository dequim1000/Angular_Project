import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DataService } from 'src/app/services/data/data.service';
@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  constructor(private _dataService: DataService, private _activatedRoute: ActivatedRoute, private _router: Router) {
    _router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe((retorno: any) => {
      this.AtualizarProduto();
    });
  }

  name: string = this.getRouteName();
  products: string[] = ['gas', 'energia', 'emissao'];
  productsPage$ = this._dataService.getData(`produto${this.capitalizeFirstLetter(this.name)}`);

  ngOnInit() {
    this.AtualizarProduto();
  }

  private async AtualizarProduto() {
    this.name = this.getRouteName();
    if (!this.products.includes(this.name) || !this.name) {
      this._router.navigate(['/home']);
      return;
    }
    this.name = this.capitalizeFirstLetter(this.name);
    this.productsPage$ = this._dataService.getData(`produto${this.name}`);
  }

  getRouteName() {
    let name = '';
    name = this._activatedRoute.snapshot.paramMap.get('name') || '';
    return name;
  }

  capitalizeFirstLetter(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
