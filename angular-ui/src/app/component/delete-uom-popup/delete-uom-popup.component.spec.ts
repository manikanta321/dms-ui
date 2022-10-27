import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUomPopupComponent } from './delete-uom-popup.component';

describe('DeleteUomPopupComponent', () => {
  let component: DeleteUomPopupComponent;
  let fixture: ComponentFixture<DeleteUomPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUomPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUomPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
