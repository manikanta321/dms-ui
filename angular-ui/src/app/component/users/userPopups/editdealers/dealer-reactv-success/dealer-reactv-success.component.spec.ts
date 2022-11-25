import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerReactvSuccessComponent } from './dealer-reactv-success.component';

describe('DealerReactvSuccessComponent', () => {
  let component: DealerReactvSuccessComponent;
  let fixture: ComponentFixture<DealerReactvSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerReactvSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerReactvSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
