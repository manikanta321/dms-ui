import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDealerSuccessfulPopupComponent } from './add-dealer-successful-popup.component';

describe('AddDealerSuccessfulPopupComponent', () => {
  let component: AddDealerSuccessfulPopupComponent;
  let fixture: ComponentFixture<AddDealerSuccessfulPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDealerSuccessfulPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDealerSuccessfulPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
