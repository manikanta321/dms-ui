import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaxTemplateComponent } from './edit-tax-template.component';

describe('EditTaxTemplateComponent', () => {
  let component: EditTaxTemplateComponent;
  let fixture: ComponentFixture<EditTaxTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTaxTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaxTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
