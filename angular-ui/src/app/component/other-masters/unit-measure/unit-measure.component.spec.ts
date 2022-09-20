import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitMeasureComponent } from './unit-measure.component';

describe('UnitMeasureComponent', () => {
  let component: UnitMeasureComponent;
  let fixture: ComponentFixture<UnitMeasureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitMeasureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitMeasureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
