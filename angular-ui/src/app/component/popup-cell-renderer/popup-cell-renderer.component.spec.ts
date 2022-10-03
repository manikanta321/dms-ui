import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCellRendererComponent } from './popup-cell-renderer.component';

describe('PopupCellRendererComponent', () => {
  let component: PopupCellRendererComponent;
  let fixture: ComponentFixture<PopupCellRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCellRendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupCellRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
