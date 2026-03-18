import { Component } from '@angular/core';
import { AnalyticsComponent } from "../analytics/analytics.component";

@Component({
  selector: 'app-dashboard-home',
  imports: [AnalyticsComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.css'
})
export class DashboardHomeComponent {

}
