import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicListActionComponent } from './geographic-list-action.component';

describe('GeographicListActionComponent', () => {
  let component: GeographicListActionComponent;
  let fixture: ComponentFixture<GeographicListActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeographicListActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeographicListActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
