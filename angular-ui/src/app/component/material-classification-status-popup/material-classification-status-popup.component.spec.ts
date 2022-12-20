import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialClassificationStatusPopupComponent } from './material-classification-status-popup.component';

describe('MaterialClassificationStatusPopupComponent', () => {
  let component: MaterialClassificationStatusPopupComponent;
  let fixture: ComponentFixture<MaterialClassificationStatusPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialClassificationStatusPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialClassificationStatusPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
