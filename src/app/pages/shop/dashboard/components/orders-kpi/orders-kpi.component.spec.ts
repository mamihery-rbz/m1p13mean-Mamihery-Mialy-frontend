import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersKpiComponent } from './orders-kpi.component';

describe('OrdersKpiComponent', () => {
  let component: OrdersKpiComponent;
  let fixture: ComponentFixture<OrdersKpiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersKpiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersKpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
