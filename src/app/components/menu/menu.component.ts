import { Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  produtosDropdown: HTMLElement | null = null;
  hamburguerMenu: HTMLElement | null = null;
  display: boolean = false;
  isMenuHamburgerOpen: boolean = false;
  arrow: string = 'assets/icons/arrow_menu_down.png';

  constructor(private _router: Router) {
    _router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.isMenuHamburgerOpen = false;
        this.display = false;
        this.arrow = 'assets/icons/arrow_menu_down.png';
      }
    });
  }
  @HostListener('window:click', ['$event'])
  clickOut(event: any) {
    if (
      event.target.offsetParent?.id != 'dropdown-content' &&
      event.target.offsetParent?.id != 'dropdown-custom-content' &&
      event.target?.id != 'hamburguer'
    ) {
      event.stopPropagation();
      this.isMenuHamburgerOpen = false;
      this.display = false;
      this.arrow = 'assets/icons/arrow_menu_down.png';
    }
  }
  ngOnInit() {}

  onHamburguerClick() {
    this.isMenuHamburgerOpen = !this.isMenuHamburgerOpen;
  }
  changeDropdownDisplay(id: string) {
    this.produtosDropdown = document.getElementById(id);
    if (this.produtosDropdown) this.produtosDropdown.classList.toggle('open');
  }

  showDropdown(id: string) {
    this.display = !this.display;
    this.arrow = this.display ? 'assets/icons/arrow_menu_up.png' : 'assets/icons/arrow_menu_down.png';
    this.changeDropdownDisplay(id);
  }
}
