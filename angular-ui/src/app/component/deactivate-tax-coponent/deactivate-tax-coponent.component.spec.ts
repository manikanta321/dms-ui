import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateTaxCoponentComponent } from './deactivate-tax-coponent.component';

describe('DeactivateTaxCoponentComponent', () => {
  let component: DeactivateTaxCoponentComponent;
  let fixture: ComponentFixture<DeactivateTaxCoponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactivateTaxCoponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactivateTaxCoponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
