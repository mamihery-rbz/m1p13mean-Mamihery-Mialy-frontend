import { Component, OnInit } from '@angular/core';
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
  selector: 'app-income-paid-admin',
  imports: [CommonModule, FormsModule],
  templateUrl: './income-paid-admin.component.html',
  styleUrl: './income-paid-admin.component.css'
})
export class IncomePaidAdminComponent implements OnInit {
    ngOnInit(): void {
    this.animateStats();
  }

  private animateStats(): void {
    const targets = {
      totalIncome:  23194.80,
      totalPaid:    8145.20,
      growthRate:   36,
      mainStocksValue: 16073.49,
      stocksGrowth: 9.3,
    };

    const zero: Stats = {
      totalIncome: 0, totalPaid: 0, growthRate: 0,
      mainStocksValue: 0, stocksGrowth: 0,
    };

    this.stats = { ...zero };

    const duration = 1200;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic

      this.stats = {
        totalIncome:    parseFloat((targets.totalIncome    * ease).toFixed(2)),
        totalPaid:      parseFloat((targets.totalPaid      * ease).toFixed(2)),
        growthRate:     Math.round(targets.growthRate      * ease),
        mainStocksValue:parseFloat((targets.mainStocksValue * ease).toFixed(2)),
        stocksGrowth:   parseFloat((targets.stocksGrowth   * ease).toFixed(1)),
      };

      if (step >= steps) {
        this.stats = { ...targets };
        clearInterval(timer);
      }
    }, interval);
  }
   stats: Stats = {
    totalIncome: 23194.80,
    totalPaid: 8145.20,
    growthRate: 36,
    mainStocksValue: 16073.49,
    stocksGrowth: 9.3,
  };
}
