import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveSuccessPopComponent } from './deactive-success-pop.component';

describe('DeactiveSuccessPopComponent', () => {
  let component: DeactiveSuccessPopComponent;
  let fixture: ComponentFixture<DeactiveSuccessPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactiveSuccessPopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactiveSuccessPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
