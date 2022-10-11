import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSuccessPopComponent } from './active-success-pop.component';

describe('ActiveSuccessPopComponent', () => {
  let component: ActiveSuccessPopComponent;
  let fixture: ComponentFixture<ActiveSuccessPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveSuccessPopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveSuccessPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
