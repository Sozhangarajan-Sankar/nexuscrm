import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService, StatInfo, MonthlyRevenue, StageInfo, TopCustomerInfo } from '../dashboard/dashboardservice.service';
import { Activity } from '../activities/activity.model';
import { StatCardComponent } from '../shared/components/stat-card/stat-card.component';
import { PageHeaderComponent } from '../shared/components/page-header/page-header.component';
import { RevenuechartComponent } from './widgets/revenuechart/revenuechart.component';
import { DealsfunnelchartComponent } from './widgets/dealsfunnelchart/dealsfunnelchart.component';
import { RecentactivityfeedComponent } from './widgets/recentactivityfeed/recentactivityfeed.component';
import { TopcustomerslistComponent } from './widgets/topcustomerslist/topcustomerslist.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, StatCardComponent, PageHeaderComponent, RevenuechartComponent, DealsfunnelchartComponent, RecentactivityfeedComponent, TopcustomerslistComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  stats: StatInfo[] = [];
  revenueData: MonthlyRevenue[] = [];
  dealStages: StageInfo[] = [];
  recentActivities: Activity[] = [];
  topCustomers: TopCustomerInfo[] = [];

  ngOnInit(): void {
    this.dashboardService.getDashboardStats().subscribe(d => {
      this.stats = [
        { label: 'Total Customers', value: d.totalCustomers, icon: '👥', trend: 'up', trendValue: '12%' },
        { label: 'Active Deals', value: d.totalDeals, icon: '💼', trend: d.dealsClosed > 0 ? 'up' : 'neutral', trendValue: d.dealsClosed + ' closed' },
        { label: 'Total Tasks', value: d.totalTasks, icon: '📋', trend: d.tasksCompleted > 0 ? 'up' : 'neutral', trendValue: d.tasksCompleted + ' done' },
        { label: 'Total Revenue', value: '$' + d.totalRevenue.toLocaleString(), icon: '💰', trend: 'up', trendValue: '24%' }
      ];
    });
    this.dashboardService.getMonthlyRevenue().subscribe(data => this.revenueData = data);
    this.dashboardService.getDealsByStage().subscribe(data => this.dealStages = data);
    this.dashboardService.getRecentActivities(10).subscribe(data => this.recentActivities = data);
    this.dashboardService.getTopCustomers(5).subscribe(data => this.topCustomers = data);
  }
}
