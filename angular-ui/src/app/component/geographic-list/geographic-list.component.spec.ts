import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicListComponent } from './geographic-list.component';

describe('GeographicListComponent', () => {
  let component: GeographicListComponent;
  let fixture: ComponentFixture<GeographicListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeographicListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeographicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
