import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMovementHistoryPageComponent } from './stock-movement-history-page.component';

describe('StockMovementHistoryPageComponent', () => {
  let component: StockMovementHistoryPageComponent;
  let fixture: ComponentFixture<StockMovementHistoryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockMovementHistoryPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockMovementHistoryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
