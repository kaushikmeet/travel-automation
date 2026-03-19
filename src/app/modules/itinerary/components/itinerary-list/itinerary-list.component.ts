import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ItineraryService } from '../../services/itinerary.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-itinerary-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './itinerary-list.component.html',
  styleUrl: './itinerary-list.component.css'
})
export class ItineraryListComponent {
  itineraries: any [] =[];

  constructor(
    private itinerarySRV: ItineraryService,
    private router: Router
  ){}

  ngOnInit(){
    this.loadItinerary();
  }

  loadItinerary(){
    this.itinerarySRV.getAll().subscribe((res:any)=>{
      this.itineraries = res.data;
    })
  };

  delete(id: string){
    if(confirm("Are you sure Delete Itinerary")){
       this.itinerarySRV.delete(id).subscribe(res=>{
         this.loadItinerary();
       }) 
    }
  }
  clone(id: string) {
  this.itinerarySRV.clone(id).subscribe({
    next: (res: any) => {
      alert('Itinerary cloned successfully');
      const newId = res.data._id;
      this.router.navigate(['/itinerary/edit', newId]);
      this.loadItinerary();
    },

    error: (err) => {
      console.error(err);
      alert('Clone failed');
    }
  });
}
}
