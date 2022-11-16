import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomDatePopupComponent } from './custom-date-popup.component';

describe('CustomDatePopupComponent', () => {
  let component: CustomDatePopupComponent;
  let fixture: ComponentFixture<CustomDatePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomDatePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomDatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
