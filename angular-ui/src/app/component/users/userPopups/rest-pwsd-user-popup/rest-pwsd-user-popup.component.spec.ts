import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestPwsdUserPopupComponent } from './rest-pwsd-user-popup.component';

describe('RestPwsdUserPopupComponent', () => {
  let component: RestPwsdUserPopupComponent;
  let fixture: ComponentFixture<RestPwsdUserPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestPwsdUserPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestPwsdUserPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
