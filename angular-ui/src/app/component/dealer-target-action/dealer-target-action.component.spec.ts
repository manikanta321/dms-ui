import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerTargetActionComponent } from './dealer-target-action.component';

describe('DealerTargetActionComponent', () => {
  let component: DealerTargetActionComponent;
  let fixture: ComponentFixture<DealerTargetActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerTargetActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerTargetActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
