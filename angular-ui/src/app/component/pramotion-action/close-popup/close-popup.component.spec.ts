import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosePopupComponent } from './close-popup.component';

describe('ClosePopupComponent', () => {
  let component: ClosePopupComponent;
  let fixture: ComponentFixture<ClosePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClosePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClosePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
