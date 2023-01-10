import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDealerTargetComponent } from './edit-dealer-target.component';

describe('EditDealerTargetComponent', () => {
  let component: EditDealerTargetComponent;
  let fixture: ComponentFixture<EditDealerTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDealerTargetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDealerTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
