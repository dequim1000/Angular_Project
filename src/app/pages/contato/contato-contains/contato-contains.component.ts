import { Component, Input } from '@angular/core';
import { Contato } from './contato-contains.interface';

@Component({
  selector: 'app-contato-contains',
  templateUrl: './contato-contains.component.html',
  styleUrls: ['./contato-contains.component.scss'],
})
export class ContatoContainsComponent {
  @Input() contatos?: Contato[] = [];
}
