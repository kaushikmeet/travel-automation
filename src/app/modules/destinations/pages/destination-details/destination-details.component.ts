import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DestinationService } from '../../destination.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-destination-details',
  imports: [CommonModule],
  templateUrl: './destination-details.component.html',
  styleUrl: './destination-details.component.css'
})
export class DestinationDetailsComponent implements OnInit {
 destination: any;
 loading: boolean = true;

 readonly imageUrl= environment.imagesUrl + '/uploads/'

 constructor(
  private route: ActivatedRoute,
  private service: DestinationService
 ){}

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const slug = params.get('slug'); 

    if (slug && slug !== 'undefined') {
      this.service.getBySlug(slug).subscribe({
        next: (res) => {
          this.destination = res.data;
        },
        error: (err) => console.error('API Error:', err)
      });
    } else {
      console.warn('Slug is undefined. Check your routerLink or Routing Module.');
    }
  });
}

 fetchDestination(slug: string) {
    this.service.getBySlug(slug).subscribe({
      next: (res) => {
        this.destination = res.data; 
        this.loading = false;
        console.log('Destination Loaded:', this.destination);
      },
      error: (err) => {
        console.error('Fetch Error:', err);
        this.loading = false;
      }
    });
  }
}
