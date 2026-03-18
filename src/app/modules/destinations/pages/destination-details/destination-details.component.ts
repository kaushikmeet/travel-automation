import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinationService } from '../../destination.service';

@Component({
  selector: 'app-destination-details',
  imports: [CommonModule],
  templateUrl: './destination-details.component.html',
  styleUrl: './destination-details.component.css'
})
export class DestinationDetailsComponent implements OnInit {
 destination: any;

 constructor(
  private route: ActivatedRoute,
  private service: DestinationService
 ){}

 ngOnInit(): void {
   const id = this.route.snapshot.paramMap.get("id");
   this.service.getById(id!).subscribe(res=>{
    this.destination=res;
   })
 }
}
