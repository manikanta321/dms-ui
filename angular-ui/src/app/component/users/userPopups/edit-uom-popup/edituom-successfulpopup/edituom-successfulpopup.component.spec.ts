import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituomSuccessfulpopupComponent } from './edituom-successfulpopup.component';

describe('EdituomSuccessfulpopupComponent', () => {
  let component: EdituomSuccessfulpopupComponent;
  let fixture: ComponentFixture<EdituomSuccessfulpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EdituomSuccessfulpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdituomSuccessfulpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
