import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UomPopupComponent } from './uom-popup.component';

describe('UomPopupComponent', () => {
  let component: UomPopupComponent;
  let fixture: ComponentFixture<UomPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UomPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UomPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
