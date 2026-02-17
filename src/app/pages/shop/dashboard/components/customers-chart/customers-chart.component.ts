import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { StatsService } from '../../../../../services/shop/stats/stats.service';

Chart.register(...registerables);


@Component({
  selector: 'app-customers-chart',
  imports: [],
  templateUrl: './customers-chart.component.html',
  styleUrl: './customers-chart.component.css'
})
export class CustomersChartComponent implements OnInit{
  constructor(private statsService: StatsService) {}

  ngOnInit(): void {
    this.loadChart();
  }

  loadChart() {
    this.statsService.get_monthly_customers().subscribe(data => {

      const labels = data.map((item: any) => `M${item.month}`);
      const values = data.map((item: any) => item.customers);

      new Chart('customersChart', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Nombre de clients',
            data: values,
            backgroundColor: '#2196F3'
          }]
        },
        options: {
          responsive: true
        }
      });

    });
  }
}
