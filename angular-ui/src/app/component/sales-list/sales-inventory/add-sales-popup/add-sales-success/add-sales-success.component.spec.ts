import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesSuccessComponent } from './add-sales-success.component';

describe('AddSalesSuccessComponent', () => {
  let component: AddSalesSuccessComponent;
  let fixture: ComponentFixture<AddSalesSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSalesSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSalesSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
