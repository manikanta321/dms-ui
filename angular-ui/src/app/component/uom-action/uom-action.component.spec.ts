import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UomActionComponent } from './uom-action.component';

describe('UomActionComponent', () => {
  let component: UomActionComponent;
  let fixture: ComponentFixture<UomActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UomActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UomActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
