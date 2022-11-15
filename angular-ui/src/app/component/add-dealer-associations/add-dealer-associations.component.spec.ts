import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDealerAssociationsComponent } from './add-dealer-associations.component';

describe('AddDealerAssociationsComponent', () => {
  let component: AddDealerAssociationsComponent;
  let fixture: ComponentFixture<AddDealerAssociationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDealerAssociationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDealerAssociationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
