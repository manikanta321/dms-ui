import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesUploadsComponent } from './sales-uploads.component';

describe('SalesUploadsComponent', () => {
  let component: SalesUploadsComponent;
  let fixture: ComponentFixture<SalesUploadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesUploadsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesUploadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
