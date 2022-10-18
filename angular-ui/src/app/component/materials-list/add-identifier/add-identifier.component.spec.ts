import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIdentifierComponent } from './add-identifier.component';

describe('AddIdentifierComponent', () => {
  let component: AddIdentifierComponent;
  let fixture: ComponentFixture<AddIdentifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIdentifierComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIdentifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
