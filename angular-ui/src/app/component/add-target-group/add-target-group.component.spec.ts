import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTargetGroupComponent } from './add-target-group.component';

describe('AddTargetGroupComponent', () => {
  let component: AddTargetGroupComponent;
  let fixture: ComponentFixture<AddTargetGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTargetGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTargetGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
