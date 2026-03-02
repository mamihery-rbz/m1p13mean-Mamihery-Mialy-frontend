import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStockProductsComponent } from './list-stock-products.component';

describe('ListStockProductsComponent', () => {
  let component: ListStockProductsComponent;
  let fixture: ComponentFixture<ListStockProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListStockProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListStockProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
