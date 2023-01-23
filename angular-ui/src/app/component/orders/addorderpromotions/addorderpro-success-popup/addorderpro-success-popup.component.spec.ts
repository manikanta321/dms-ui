import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddorderproSuccessPopupComponent } from './addorderpro-success-popup.component';

describe('AddorderproSuccessPopupComponent', () => {
  let component: AddorderproSuccessPopupComponent;
  let fixture: ComponentFixture<AddorderproSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddorderproSuccessPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddorderproSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
