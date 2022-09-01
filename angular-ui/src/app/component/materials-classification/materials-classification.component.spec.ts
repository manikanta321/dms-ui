import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsClassificationComponent } from './materials-classification.component';

describe('MaterialsClassificationComponent', () => {
  let component: MaterialsClassificationComponent;
  let fixture: ComponentFixture<MaterialsClassificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialsClassificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialsClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
