import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js'



Chart.register(...registerables);

@Component({
  selector: 'app-analytics',
  imports: [CommonModule],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.css'
})
export class AnalyticsComponent implements AfterViewInit{


  ngAfterViewInit(): void {
    new Chart('revenueChart',{
      type: 'line',
      data:{
        labels:["Jan", "Feb", "Mar", "Apr", "May"],
        datasets:[{
          label:'Revenue',
          data:[1200, 1900, 3000, 5000, 4200]
        }]
      }
    })

    new Chart('usersChart',{
      type:"bar",
      data:{
        labels:["Jan", "Feb", "Mar", "Apr", "May"],
        datasets:[{
          label:"User Growth",
          data:[50,120,200,350,500]
        }]
      }
    })

    new Chart('packageChart',{
      type:'pie',
      data:{
        labels:["Goa", "Dubai", "Bali", "Thailand"],
        datasets:[{
          data:[30,25,20,25]
        }]
      }
    })
  }

}
