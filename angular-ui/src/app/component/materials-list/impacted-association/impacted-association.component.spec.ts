import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpactedAssociationComponent } from './impacted-association.component';

describe('ImpactedAssociationComponent', () => {
  let component: ImpactedAssociationComponent;
  let fixture: ComponentFixture<ImpactedAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImpactedAssociationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpactedAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
