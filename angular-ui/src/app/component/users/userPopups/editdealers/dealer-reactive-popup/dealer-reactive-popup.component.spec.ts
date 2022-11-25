import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerReactivePopupComponent } from './dealer-reactive-popup.component';

describe('DealerReactivePopupComponent', () => {
  let component: DealerReactivePopupComponent;
  let fixture: ComponentFixture<DealerReactivePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerReactivePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerReactivePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
