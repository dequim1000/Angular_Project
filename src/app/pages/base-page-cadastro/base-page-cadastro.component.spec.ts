import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePageCadastroComponent } from './base-page-cadastro.component';

describe('BasePageCadastroComponent', () => {
  let component: BasePageCadastroComponent;
  let fixture: ComponentFixture<BasePageCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasePageCadastroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BasePageCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
