import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInvoiceComponentComponent } from './view-invoice-component.component';

describe('ViewInvoiceComponentComponent', () => {
  let component: ViewInvoiceComponentComponent;
  let fixture: ComponentFixture<ViewInvoiceComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewInvoiceComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewInvoiceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
