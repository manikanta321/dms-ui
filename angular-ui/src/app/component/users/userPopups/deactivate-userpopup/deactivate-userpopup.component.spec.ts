import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivateUserpopupComponent } from './deactivate-userpopup.component';

describe('DeactivateUserpopupComponent', () => {
  let component: DeactivateUserpopupComponent;
  let fixture: ComponentFixture<DeactivateUserpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactivateUserpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactivateUserpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
