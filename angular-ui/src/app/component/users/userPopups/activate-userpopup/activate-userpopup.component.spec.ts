import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivateUserpopupComponent } from './activate-userpopup.component';

describe('ActivateUserpopupComponent', () => {
  let component: ActivateUserpopupComponent;
  let fixture: ComponentFixture<ActivateUserpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivateUserpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivateUserpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
