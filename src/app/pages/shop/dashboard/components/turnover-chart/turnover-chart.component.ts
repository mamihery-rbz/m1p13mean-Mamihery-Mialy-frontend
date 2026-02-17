import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { StatsService } from '../../../../../services/shop/stats/stats.service';

Chart.register(...registerables);

@Component({
  selector: 'app-turnover-chart',
  imports: [],
  templateUrl: './turnover-chart.component.html',
  styleUrl: './turnover-chart.component.css'
})
export class TurnoverChartComponent {
  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.loadChart();
  }

  loadChart() {
    this.statsService.get_monthly_turnover().subscribe(data => {

      const labels = data.map((item: any) => `M${item.month}`);
      const values = data.map((item: any) => item.turnover);

      new Chart('turnoverChart', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Chiffre d’affaire',
            data: values,
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76,175,80,0.2)',
            tension: 0.3
          }]
        },
        options: {
          responsive: true
        }
      });

    });
  }
}
