import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCadastroComponent } from './menu-cadastro.component';

describe('MenuCadastroComponent', () => {
  let component: MenuCadastroComponent;
  let fixture: ComponentFixture<MenuCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuCadastroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
