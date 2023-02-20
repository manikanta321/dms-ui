import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileSuccessPopupComponent } from './edit-profile-success-popup.component';

describe('EditProfileSuccessPopupComponent', () => {
  let component: EditProfileSuccessPopupComponent;
  let fixture: ComponentFixture<EditProfileSuccessPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileSuccessPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileSuccessPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
