import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactiveTypeCompoComponent } from './deactive-type-compo.component';

describe('DeactiveTypeCompoComponent', () => {
  let component: DeactiveTypeCompoComponent;
  let fixture: ComponentFixture<DeactiveTypeCompoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactiveTypeCompoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeactiveTypeCompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
