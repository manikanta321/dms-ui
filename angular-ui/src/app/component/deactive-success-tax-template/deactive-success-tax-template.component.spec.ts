import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveSuccessTaxTemplateComponent } from './deactive-success-tax-template.component';

describe('DeactiveSuccessTaxTemplateComponent', () => {
  let component: DeactiveSuccessTaxTemplateComponent;
  let fixture: ComponentFixture<DeactiveSuccessTaxTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactiveSuccessTaxTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactiveSuccessTaxTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
