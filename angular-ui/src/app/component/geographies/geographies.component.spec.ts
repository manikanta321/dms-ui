import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographiesComponent } from './geographies.component';

describe('GeographiesComponent', () => {
  let component: GeographiesComponent;
  let fixture: ComponentFixture<GeographiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeographiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeographiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
