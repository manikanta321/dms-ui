import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveSubcategoryCompoComponent } from './deactive-subcategory-compo.component';

describe('DeactiveSubcategoryCompoComponent', () => {
  let component: DeactiveSubcategoryCompoComponent;
  let fixture: ComponentFixture<DeactiveSubcategoryCompoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactiveSubcategoryCompoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactiveSubcategoryCompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
