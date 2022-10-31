import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupGridTableComponent } from './popup-grid-table.component';

describe('PopupGridTableComponent', () => {
  let component: PopupGridTableComponent;
  let fixture: ComponentFixture<PopupGridTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupGridTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupGridTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
