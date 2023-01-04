import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialclassificationEditSuccessComponent } from './materialclassification-edit-success.component';

describe('MaterialclassificationEditSuccessComponent', () => {
  let component: MaterialclassificationEditSuccessComponent;
  let fixture: ComponentFixture<MaterialclassificationEditSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialclassificationEditSuccessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialclassificationEditSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
