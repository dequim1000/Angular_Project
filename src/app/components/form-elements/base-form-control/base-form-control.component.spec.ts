import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFormControlComponent } from './base-form-control.component';

describe('BaseFormControlComponent', () => {
  let component: BaseFormControlComponent;
  let fixture: ComponentFixture<BaseFormControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BaseFormControlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseFormControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
