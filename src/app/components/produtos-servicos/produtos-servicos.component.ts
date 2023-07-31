import { Component, Input } from '@angular/core';
import { ProdutosServico } from './produtos-servicos.interface';
@Component({
  selector: 'app-produtos-servicos',
  templateUrl: './produtos-servicos.component.html',
  styleUrls: ['./produtos-servicos.component.scss'],
})
export class ProdutosServicosComponent {
  @Input() produtosServicos?: ProdutosServico;
}
