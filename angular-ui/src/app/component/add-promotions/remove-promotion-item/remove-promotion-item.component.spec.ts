import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePromotionItemComponent } from './remove-promotion-item.component';

describe('RemovePromotionItemComponent', () => {
  let component: RemovePromotionItemComponent;
  let fixture: ComponentFixture<RemovePromotionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovePromotionItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemovePromotionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
