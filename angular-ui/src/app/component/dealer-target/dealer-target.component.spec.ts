import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerTargetComponent } from './dealer-target.component';

describe('DealerTargetComponent', () => {
  let component: DealerTargetComponent;
  let fixture: ComponentFixture<DealerTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerTargetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
