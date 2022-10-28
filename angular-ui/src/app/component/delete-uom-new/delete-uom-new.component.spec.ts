import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUomNewComponent } from './delete-uom-new.component';

describe('DeleteUomNewComponent', () => {
  let component: DeleteUomNewComponent;
  let fixture: ComponentFixture<DeleteUomNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUomNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteUomNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
