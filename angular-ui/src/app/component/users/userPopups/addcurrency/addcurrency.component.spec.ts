import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcurrencyComponent } from './addcurrency.component';

describe('AddcurrencyComponent', () => {
  let component: AddcurrencyComponent;
  let fixture: ComponentFixture<AddcurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcurrencyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
