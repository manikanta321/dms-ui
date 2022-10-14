import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoClassificationComponent } from './geo-classification.component';

describe('GeoClassificationComponent', () => {
  let component: GeoClassificationComponent;
  let fixture: ComponentFixture<GeoClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoClassificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeoClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
