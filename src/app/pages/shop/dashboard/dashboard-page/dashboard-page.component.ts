import { Component } from '@angular/core';
import { OrdersKpiComponent } from "../components/orders-kpi/orders-kpi.component";
import { TurnoverChartComponent } from "../components/turnover-chart/turnover-chart.component";
import { CustomersChartComponent } from "../components/customers-chart/customers-chart.component";

@Component({
  selector: 'app-dashboard-page',
  imports: [OrdersKpiComponent, TurnoverChartComponent, CustomersChartComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

}
