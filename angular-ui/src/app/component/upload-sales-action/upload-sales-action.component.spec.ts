import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSalesActionComponent } from './upload-sales-action.component';

describe('UploadSalesActionComponent', () => {
  let component: UploadSalesActionComponent;
  let fixture: ComponentFixture<UploadSalesActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSalesActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSalesActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
