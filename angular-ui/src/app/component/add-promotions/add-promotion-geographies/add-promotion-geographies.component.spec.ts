import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPromotionGeographiesComponent } from './add-promotion-geographies.component';

describe('AddPromotionGeographiesComponent', () => {
  let component: AddPromotionGeographiesComponent;
  let fixture: ComponentFixture<AddPromotionGeographiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPromotionGeographiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPromotionGeographiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
