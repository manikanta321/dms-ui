import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUomPopupComponent } from './edit-uom-popup.component';

describe('EditUomPopupComponent', () => {
  let component: EditUomPopupComponent;
  let fixture: ComponentFixture<EditUomPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUomPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUomPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
