import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkEditAssosiationComponent } from './bulk-edit-assosiation.component';

describe('BulkEditAssosiationComponent', () => {
  let component: BulkEditAssosiationComponent;
  let fixture: ComponentFixture<BulkEditAssosiationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkEditAssosiationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BulkEditAssosiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
