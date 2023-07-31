import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessaoInformativaComponent } from './sessao-informativa.component';

describe('SessaoInformativaComponent', () => {
  let component: SessaoInformativaComponent;
  let fixture: ComponentFixture<SessaoInformativaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessaoInformativaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SessaoInformativaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
