import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialaddedSuccessPopComponent } from './materialadded-success-pop.component';

describe('MaterialaddedSuccessPopComponent', () => {
  let component: MaterialaddedSuccessPopComponent;
  let fixture: ComponentFixture<MaterialaddedSuccessPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialaddedSuccessPopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialaddedSuccessPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
