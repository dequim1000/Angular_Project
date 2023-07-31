import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitacaoComponent } from './citacao.component';

describe('CitacaoComponent', () => {
  let component: CitacaoComponent;
  let fixture: ComponentFixture<CitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CitacaoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
