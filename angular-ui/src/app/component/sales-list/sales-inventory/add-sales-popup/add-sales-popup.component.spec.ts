import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesPopupComponent } from './add-sales-popup.component';

describe('AddSalesPopupComponent', () => {
  let component: AddSalesPopupComponent;
  let fixture: ComponentFixture<AddSalesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalesPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
