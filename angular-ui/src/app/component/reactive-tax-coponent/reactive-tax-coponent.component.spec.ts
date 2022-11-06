import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveTaxCoponentComponent } from './reactive-tax-coponent.component';

describe('ReactiveTaxCoponentComponent', () => {
  let component: ReactiveTaxCoponentComponent;
  let fixture: ComponentFixture<ReactiveTaxCoponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveTaxCoponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReactiveTaxCoponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
