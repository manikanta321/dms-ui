import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPsubgGridTableComponent } from './popup-psubg-grid-table.component';

describe('PopupPsubgGridTableComponent', () => {
  let component: PopupPsubgGridTableComponent;
  let fixture: ComponentFixture<PopupPsubgGridTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPsubgGridTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupPsubgGridTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
