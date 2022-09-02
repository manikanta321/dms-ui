import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaxTemplateComponent } from './add-tax-template.component';

describe('AddTaxTemplateComponent', () => {
  let component: AddTaxTemplateComponent;
  let fixture: ComponentFixture<AddTaxTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaxTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaxTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
