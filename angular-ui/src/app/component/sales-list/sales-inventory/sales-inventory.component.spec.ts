import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesInventoryComponent } from './sales-inventory.component';

describe('SalesInventoryComponent', () => {
  let component: SalesInventoryComponent;
  let fixture: ComponentFixture<SalesInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
