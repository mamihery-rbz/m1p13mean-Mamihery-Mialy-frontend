import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Stats {
  totalIncome: number;
  totalPaid: number;
  growthRate: number;
  mainStocksValue: number;
  stocksGrowth: number;
}

@Component({
  selector: 'app-days-stock-admin',
  imports: [FormsModule, CommonModule],
  templateUrl: './days-stock-admin.component.html',
  styleUrl: './days-stock-admin.component.css'
})
export class DaysStockAdminComponent {
  streakDays = 13;
  streakHours = 109;
  streakMinutes = 23;

  stats: Stats = {
    totalIncome: 23194.80,
    totalPaid: 8145.20,
    growthRate: 36,
    mainStocksValue: 16073.49,
    stocksGrowth: 9.3,
  };

  heatDots: boolean[] = [
    true, true, false, true, true, true, false,
    true, true, true, false, true, false, true,
    false, true, true, true, false, true,
  ];
  
  miniBarData: number[] = [10, 20, 15, 30, 25, 38, 20, 32, 28, 35];

  sparklinePoints =
    '0,25 15,20 20,24 30,10 40,18 50,12 60,16 70,8 80,14';


}
