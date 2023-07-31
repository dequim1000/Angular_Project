import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoStepperComponent } from './botao-stepper.component';

describe('BotaoStepperComponent', () => {
  let component: BotaoStepperComponent;
  let fixture: ComponentFixture<BotaoStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BotaoStepperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BotaoStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
