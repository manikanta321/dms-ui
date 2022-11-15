import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PramotionActionComponent } from './pramotion-action.component';

describe('PramotionActionComponent', () => {
  let component: PramotionActionComponent;
  let fixture: ComponentFixture<PramotionActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PramotionActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PramotionActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
