import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../../../../services/shop/stats/stats.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-kpi',
  imports: [CommonModule],
  templateUrl: './orders-kpi.component.html',
  styleUrl: './orders-kpi.component.css'
})
export class OrdersKpiComponent implements OnInit{
  kpi: any;

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.statsService.get_orders_KPI().subscribe(data => {
      this.kpi = data;
    });
  }
}
