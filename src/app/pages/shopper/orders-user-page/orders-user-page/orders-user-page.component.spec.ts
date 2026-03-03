import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersUserPageComponent } from './orders-user-page.component';

describe('OrdersUserPageComponent', () => {
  let component: OrdersUserPageComponent;
  let fixture: ComponentFixture<OrdersUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersUserPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdersUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
