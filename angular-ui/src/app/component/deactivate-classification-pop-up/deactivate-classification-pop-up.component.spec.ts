import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateClassificationPopUpComponent } from './deactivate-classification-pop-up.component';

describe('DeactivateClassificationPopUpComponent', () => {
  let component: DeactivateClassificationPopUpComponent;
  let fixture: ComponentFixture<DeactivateClassificationPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactivateClassificationPopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactivateClassificationPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
