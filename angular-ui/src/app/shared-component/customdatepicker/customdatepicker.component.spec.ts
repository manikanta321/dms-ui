import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomdatepickerComponent } from './customdatepicker.component';

describe('CustomdatepickerComponent', () => {
  let component: CustomdatepickerComponent;
  let fixture: ComponentFixture<CustomdatepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomdatepickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomdatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
