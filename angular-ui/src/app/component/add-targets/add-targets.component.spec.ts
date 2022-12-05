import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTargetsComponent } from './add-targets.component';

describe('AddTargetsComponent', () => {
  let component: AddTargetsComponent;
  let fixture: ComponentFixture<AddTargetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTargetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTargetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
