import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePromotionSucessComponent } from './remove-promotion-sucess.component';

describe('RemovePromotionSucessComponent', () => {
  let component: RemovePromotionSucessComponent;
  let fixture: ComponentFixture<RemovePromotionSucessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovePromotionSucessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemovePromotionSucessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
