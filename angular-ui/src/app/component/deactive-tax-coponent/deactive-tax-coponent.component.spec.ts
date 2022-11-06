import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveTaxCoponentComponent } from './deactive-tax-coponent.component';

describe('DeactiveTaxCoponentComponent', () => {
  let component: DeactiveTaxCoponentComponent;
  let fixture: ComponentFixture<DeactiveTaxCoponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactiveTaxCoponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactiveTaxCoponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
