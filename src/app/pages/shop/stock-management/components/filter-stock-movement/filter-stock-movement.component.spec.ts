import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterStockMovementComponent } from './filter-stock-movement.component';

describe('FilterStockMovementComponent', () => {
  let component: FilterStockMovementComponent;
  let fixture: ComponentFixture<FilterStockMovementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterStockMovementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterStockMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
