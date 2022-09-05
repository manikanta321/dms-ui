import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherMastersComponent } from './other-masters.component';

describe('OtherMastersComponent', () => {
  let component: OtherMastersComponent;
  let fixture: ComponentFixture<OtherMastersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherMastersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
