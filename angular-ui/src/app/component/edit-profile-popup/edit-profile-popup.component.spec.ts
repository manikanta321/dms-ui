import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePopupComponent } from './edit-profile-popup.component';

describe('EditProfilePopupComponent', () => {
  let component: EditProfilePopupComponent;
  let fixture: ComponentFixture<EditProfilePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfilePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfilePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
