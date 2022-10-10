import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatepopUpComponent } from './activatepop-up.component';

describe('ActivatepopUpComponent', () => {
  let component: ActivatepopUpComponent;
  let fixture: ComponentFixture<ActivatepopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivatepopUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivatepopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
