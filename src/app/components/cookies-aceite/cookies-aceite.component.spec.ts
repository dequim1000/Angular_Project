import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesAceiteComponent } from './cookies-aceite.component';

describe('CookiesAceiteComponent', () => {
  let component: CookiesAceiteComponent;
  let fixture: ComponentFixture<CookiesAceiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CookiesAceiteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CookiesAceiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
