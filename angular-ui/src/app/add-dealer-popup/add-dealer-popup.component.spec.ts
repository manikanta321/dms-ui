import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDealerPopupComponent } from './add-dealer-popup.component';

describe('AddDealerPopupComponent', () => {
  let component: AddDealerPopupComponent;
  let fixture: ComponentFixture<AddDealerPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDealerPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDealerPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
