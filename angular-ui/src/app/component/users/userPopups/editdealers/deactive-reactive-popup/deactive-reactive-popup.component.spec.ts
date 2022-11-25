import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveReactivePopupComponent } from './deactive-reactive-popup.component';

describe('DeactiveReactivePopupComponent', () => {
  let component: DeactiveReactivePopupComponent;
  let fixture: ComponentFixture<DeactiveReactivePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactiveReactivePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactiveReactivePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
