import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxTempleateActionComponent } from './tax-templeate-action.component';

describe('TaxTempleateActionComponent', () => {
  let component: TaxTempleateActionComponent;
  let fixture: ComponentFixture<TaxTempleateActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxTempleateActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxTempleateActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
