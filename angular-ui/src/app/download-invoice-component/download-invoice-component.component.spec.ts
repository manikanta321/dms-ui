import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadInvoiceComponentComponent } from './download-invoice-component.component';

describe('DownloadInvoiceComponentComponent', () => {
  let component: DownloadInvoiceComponentComponent;
  let fixture: ComponentFixture<DownloadInvoiceComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadInvoiceComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadInvoiceComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
