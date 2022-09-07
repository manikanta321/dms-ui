import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationTargetPopupComponent } from './association-target-popup.component';

describe('AssociationTargetPopupComponent', () => {
  let component: AssociationTargetPopupComponent;
  let fixture: ComponentFixture<AssociationTargetPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationTargetPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociationTargetPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
