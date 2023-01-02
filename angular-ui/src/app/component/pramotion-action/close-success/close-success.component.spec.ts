import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseSuccessComponent } from './close-success.component';

describe('CloseSuccessComponent', () => {
  let component: CloseSuccessComponent;
  let fixture: ComponentFixture<CloseSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
