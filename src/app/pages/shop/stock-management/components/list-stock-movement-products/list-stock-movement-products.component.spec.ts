import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStockMovementProductsComponent } from './list-stock-movement-products.component';

describe('ListStockMovementProductsComponent', () => {
  let component: ListStockMovementProductsComponent;
  let fixture: ComponentFixture<ListStockMovementProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListStockMovementProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStockMovementProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
