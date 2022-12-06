import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTargetComponent } from './material-target.component';

describe('MaterialTargetComponent', () => {
  let component: MaterialTargetComponent;
  let fixture: ComponentFixture<MaterialTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialTargetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialTargetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
