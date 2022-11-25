import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetGroupsComponent } from './target-groups.component';

describe('TargetGroupsComponent', () => {
  let component: TargetGroupsComponent;
  let fixture: ComponentFixture<TargetGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TargetGroupsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
