import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConversationComponent } from './currency-conversation.component';

describe('CurrencyConversationComponent', () => {
  let component: CurrencyConversationComponent;
  let fixture: ComponentFixture<CurrencyConversationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyConversationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrencyConversationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
