import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContatoContainsComponent } from './contato-contains.component';

describe('ContatoContainsComponent', () => {
  let component: ContatoContainsComponent;
  let fixture: ComponentFixture<ContatoContainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContatoContainsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContatoContainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
