import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconHoverComponent } from './icon-hover.component';

describe('IconHoverComponent', () => {
  let component: IconHoverComponent;
  let fixture: ComponentFixture<IconHoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconHoverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconHoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
