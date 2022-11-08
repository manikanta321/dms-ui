import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPscGridTableComponent } from './popup-psc-grid-table.component';

describe('PopupPscGridTableComponent', () => {
  let component: PopupPscGridTableComponent;
  let fixture: ComponentFixture<PopupPscGridTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPscGridTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupPscGridTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
