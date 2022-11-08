import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdealersComponent } from './editdealers.component';

describe('EditdealersComponent', () => {
  let component: EditdealersComponent;
  let fixture: ComponentFixture<EditdealersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdealersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditdealersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
