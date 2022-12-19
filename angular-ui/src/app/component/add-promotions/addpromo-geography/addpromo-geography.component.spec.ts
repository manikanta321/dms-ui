import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpromoGeographyComponent } from './addpromo-geography.component';

describe('AddpromoGeographyComponent', () => {
  let component: AddpromoGeographyComponent;
  let fixture: ComponentFixture<AddpromoGeographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpromoGeographyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddpromoGeographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
