import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeDefaultComponent } from './make-default.component';

describe('MakeDefaultComponent', () => {
  let component: MakeDefaultComponent;
  let fixture: ComponentFixture<MakeDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeDefaultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
