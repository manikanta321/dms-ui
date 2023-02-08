import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerTargetPopupGridComponent } from './dealer-target-popup-grid.component';

describe('DealerTargetPopupGridComponent', () => {
  let component: DealerTargetPopupGridComponent;
  let fixture: ComponentFixture<DealerTargetPopupGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerTargetPopupGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerTargetPopupGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
