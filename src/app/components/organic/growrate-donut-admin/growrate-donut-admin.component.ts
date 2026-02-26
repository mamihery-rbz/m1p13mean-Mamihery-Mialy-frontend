import { Component } from '@angular/core';

interface Stats {
  totalIncome: number;
  totalPaid: number;
  growthRate: number;
  mainStocksValue: number;
  stocksGrowth: number;
}

@Component({
  selector: 'app-growrate-donut-admin',
  imports: [],
  templateUrl: './growrate-donut-admin.component.html',
  styleUrl: './growrate-donut-admin.component.css'
})
export class GrowrateDonutAdminComponent {
  stats: Stats = {
    totalIncome: 23194.80,
    totalPaid: 8145.20,
    growthRate: 36,
    mainStocksValue: 16073.49,
    stocksGrowth: 9.3,
  };
}
