import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private route: Router){}

  goPackages(){
    this.route.navigate(['/packages/package-list']);
  }

  goDestination(){
   this.route.navigate(['/destinations/destination-list']);
  }
  goBooking(){

  }
  goReview(){}
  goPayment(){}
}
