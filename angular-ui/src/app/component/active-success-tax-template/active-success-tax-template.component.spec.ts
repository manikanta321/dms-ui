import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSuccessTaxTemplateComponent } from './active-success-tax-template.component';

describe('ActiveSuccessTaxTemplateComponent', () => {
  let component: ActiveSuccessTaxTemplateComponent;
  let fixture: ComponentFixture<ActiveSuccessTaxTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveSuccessTaxTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveSuccessTaxTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
