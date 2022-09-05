import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialAddEditpopupComponent } from './material-add-editpopup.component';

describe('MaterialAddEditpopupComponent', () => {
  let component: MaterialAddEditpopupComponent;
  let fixture: ComponentFixture<MaterialAddEditpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialAddEditpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialAddEditpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
