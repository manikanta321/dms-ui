import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtaxTemplateSuccessfulPopupComponent } from './addtax-template-successful-popup.component';

describe('AddtaxTemplateSuccessfulPopupComponent', () => {
  let component: AddtaxTemplateSuccessfulPopupComponent;
  let fixture: ComponentFixture<AddtaxTemplateSuccessfulPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtaxTemplateSuccessfulPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddtaxTemplateSuccessfulPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
