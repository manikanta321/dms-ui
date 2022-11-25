import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoActivateDeactivateComponent } from './geo-activate-deactivate.component';

describe('GeoActivateDeactivateComponent', () => {
  let component: GeoActivateDeactivateComponent;
  let fixture: ComponentFixture<GeoActivateDeactivateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoActivateDeactivateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeoActivateDeactivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
