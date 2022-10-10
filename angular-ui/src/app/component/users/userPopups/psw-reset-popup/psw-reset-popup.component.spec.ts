import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PswResetPopupComponent } from './psw-reset-popup.component';

describe('PswResetPopupComponent', () => {
  let component: PswResetPopupComponent;
  let fixture: ComponentFixture<PswResetPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PswResetPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PswResetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
