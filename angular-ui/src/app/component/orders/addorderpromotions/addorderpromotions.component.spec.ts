import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddorderpromotionsComponent } from './addorderpromotions.component';

describe('AddorderpromotionsComponent', () => {
  let component: AddorderpromotionsComponent;
  let fixture: ComponentFixture<AddorderpromotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddorderpromotionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddorderpromotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
