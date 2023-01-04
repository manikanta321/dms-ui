import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcurrencySuccessfullyPopupComponent } from './addcurrency-successfully-popup.component';

describe('AddcurrencySuccessfullyPopupComponent', () => {
  let component: AddcurrencySuccessfullyPopupComponent;
  let fixture: ComponentFixture<AddcurrencySuccessfullyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcurrencySuccessfullyPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcurrencySuccessfullyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
