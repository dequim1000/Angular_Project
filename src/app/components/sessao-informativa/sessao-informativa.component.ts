import { Component, Input } from '@angular/core';
import { SessaoInformativa } from './sessao-informativa.interface';

@Component({
  selector: 'app-sessao-informativa',
  templateUrl: './sessao-informativa.component.html',
  styleUrls: ['./sessao-informativa.component.scss'],
})
export class SessaoInformativaComponent {
  @Input() sessaoInformativa?: SessaoInformativa;
  @Input() posicao: 'left' | 'right' = 'right';
}
