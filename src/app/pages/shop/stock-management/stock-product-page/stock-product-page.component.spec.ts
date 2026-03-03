import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockProductPageComponent } from './stock-product-page.component';

describe('StockProductPageComponent', () => {
  let component: StockProductPageComponent;
  let fixture: ComponentFixture<StockProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockProductPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
