import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldErrosComponent } from './field-erros.component';

describe('FieldErrosComponent', () => {
  let component: FieldErrosComponent;
  let fixture: ComponentFixture<FieldErrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FieldErrosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FieldErrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
