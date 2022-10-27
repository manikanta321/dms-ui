import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUomSuccessfullPopupComponent } from './delete-uom-successfull-popup.component';

describe('DeleteUomSuccessfullPopupComponent', () => {
  let component: DeleteUomSuccessfullPopupComponent;
  let fixture: ComponentFixture<DeleteUomSuccessfullPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUomSuccessfullPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUomSuccessfullPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
