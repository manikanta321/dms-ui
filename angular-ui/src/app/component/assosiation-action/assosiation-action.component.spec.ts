import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssosiationActionComponent } from './assosiation-action.component';

describe('AssosiationActionComponent', () => {
  let component: AssosiationActionComponent;
  let fixture: ComponentFixture<AssosiationActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssosiationActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssosiationActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
