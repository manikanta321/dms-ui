import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoStatusPopComponent } from './geo-status-pop.component';

describe('GeoStatusPopComponent', () => {
  let component: GeoStatusPopComponent;
  let fixture: ComponentFixture<GeoStatusPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoStatusPopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeoStatusPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
