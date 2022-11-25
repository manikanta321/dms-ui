import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerDeactiveComponent } from './dealer-deactive.component';

describe('DealerDeactiveComponent', () => {
  let component: DealerDeactiveComponent;
  let fixture: ComponentFixture<DealerDeactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerDeactiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerDeactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
