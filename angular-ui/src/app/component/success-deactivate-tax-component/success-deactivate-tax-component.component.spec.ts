import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessDeactivateTaxComponentComponent } from './success-deactivate-tax-component.component';

describe('SuccessDeactivateTaxComponentComponent', () => {
  let component: SuccessDeactivateTaxComponentComponent;
  let fixture: ComponentFixture<SuccessDeactivateTaxComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessDeactivateTaxComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessDeactivateTaxComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
