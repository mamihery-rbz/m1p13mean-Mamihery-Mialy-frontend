import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VisaCardAdminComponent } from '../../components/organic/visa-card-admin/visa-card-admin.component';
import { MenuAdminComponent } from '../../components/organic/menu-admin/menu-admin.component';
import { TaskAdminComponent } from '../../components/organic/task-admin/task-admin.component';
import { GreatingMicAdminComponent } from '../../components/organic/greating-mic-admin/greating-mic-admin.component';
import { IncomePaidAdminComponent } from '../../components/organic/income-paid-admin/income-paid-admin.component';
import { GrowrateDonutAdminComponent } from '../../components/organic/growrate-donut-admin/growrate-donut-admin.component';
import { DaysStockAdminComponent } from '../../components/organic/days-stock-admin/days-stock-admin.component';
import { AnnualProfitsAdminComponent } from '../../components/organic/annual-profits-admin/annual-profits-admin.component';
import { ActivityManagerAdminComponent } from '../../components/organic/activity-manager-admin/activity-manager-admin.component';
import { WalletverificationReviewAdminComponent } from '../../components/organic/walletverification-review-admin/walletverification-review-admin.component';

@Component({
  selector: 'app-home-page-admin',
  templateUrl: './home-page-admin.component.html',
  styleUrls: ['./home-page-admin.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule,VisaCardAdminComponent,MenuAdminComponent,TaskAdminComponent,GreatingMicAdminComponent,IncomePaidAdminComponent,GrowrateDonutAdminComponent,DaysStockAdminComponent,AnnualProfitsAdminComponent,ActivityManagerAdminComponent,WalletverificationReviewAdminComponent],
})
export class HomePageAdminComponent {

}