import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTargetGroupSuccessPopupComponent } from './add-target-group-success-popup.component';

describe('AddTargetGroupSuccessPopupComponent', () => {
  let component: AddTargetGroupSuccessPopupComponent;
  let fixture: ComponentFixture<AddTargetGroupSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTargetGroupSuccessPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTargetGroupSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
