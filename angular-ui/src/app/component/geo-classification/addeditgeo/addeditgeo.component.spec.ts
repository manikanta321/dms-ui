import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditgeoComponent } from './addeditgeo.component';

describe('AddeditgeoComponent', () => {
  let component: AddeditgeoComponent;
  let fixture: ComponentFixture<AddeditgeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditgeoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddeditgeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
