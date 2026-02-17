import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnoverChartComponent } from './turnover-chart.component';

describe('TurnoverChartComponent', () => {
  let component: TurnoverChartComponent;
  let fixture: ComponentFixture<TurnoverChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnoverChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TurnoverChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
