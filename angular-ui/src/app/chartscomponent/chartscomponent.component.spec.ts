import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartscomponentComponent } from './chartscomponent.component';

describe('ChartscomponentComponent', () => {
  let component: ChartscomponentComponent;
  let fixture: ComponentFixture<ChartscomponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartscomponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartscomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
