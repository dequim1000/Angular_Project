import { Component, Input } from '@angular/core';
import { Citacao, Paragrafos } from './citacao.interface';

@Component({
  selector: 'app-citacao',
  templateUrl: './citacao.component.html',
  styleUrls: ['./citacao.component.scss'],
})
export class CitacaoComponent {
  @Input() citacao?: Citacao;
}
