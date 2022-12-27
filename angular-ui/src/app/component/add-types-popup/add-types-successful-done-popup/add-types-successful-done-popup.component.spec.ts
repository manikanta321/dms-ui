import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypesSuccessfulDonePopupComponent } from './add-types-successful-done-popup.component';

describe('AddTypesSuccessfulDonePopupComponent', () => {
  let component: AddTypesSuccessfulDonePopupComponent;
  let fixture: ComponentFixture<AddTypesSuccessfulDonePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypesSuccessfulDonePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTypesSuccessfulDonePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
