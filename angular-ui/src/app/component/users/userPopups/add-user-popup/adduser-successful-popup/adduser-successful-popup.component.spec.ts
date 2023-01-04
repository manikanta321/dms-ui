import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserSuccessfulPopupComponent } from './adduser-successful-popup.component';

describe('AdduserSuccessfulPopupComponent', () => {
  let component: AdduserSuccessfulPopupComponent;
  let fixture: ComponentFixture<AdduserSuccessfulPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdduserSuccessfulPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdduserSuccessfulPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
