import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypesPopupComponent } from './add-types-popup.component';

describe('AddTypesPopupComponent', () => {
  let component: AddTypesPopupComponent;
  let fixture: ComponentFixture<AddTypesPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTypesPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTypesPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
