import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetGroupsActionComponent } from './target-groups-action.component';

describe('TargetGroupsActionComponent', () => {
  let component: TargetGroupsActionComponent;
  let fixture: ComponentFixture<TargetGroupsActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetGroupsActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetGroupsActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
