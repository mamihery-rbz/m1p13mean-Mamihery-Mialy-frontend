import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStockMovementComponent } from './form-stock-movement.component';

describe('FormStockMovementComponent', () => {
  let component: FormStockMovementComponent;
  let fixture: ComponentFixture<FormStockMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormStockMovementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormStockMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
