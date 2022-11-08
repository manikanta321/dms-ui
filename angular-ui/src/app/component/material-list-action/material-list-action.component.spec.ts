import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialListActionComponent } from './material-list-action.component';

describe('MaterialListActionComponent', () => {
  let component: MaterialListActionComponent;
  let fixture: ComponentFixture<MaterialListActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialListActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialListActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
