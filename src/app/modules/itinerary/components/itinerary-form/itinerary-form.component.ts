import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ItineraryService } from '../../services/itinerary.service';
import { Router } from '@angular/router';
import { PackageService } from '../../../packages/package.service';

@Component({
  selector: 'app-itinerary-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './itinerary-form.component.html',
  styleUrl: './itinerary-form.component.css'
})
export class ItineraryFormComponent {
  packages: any[]=[];

  form: any = {
    title: '',
    description: '',
    duration: 1,
    price: 0,
    packageId: '',
    days: []
  };

  loading = false;

  constructor(
    private itineraryService: ItineraryService,
    private router: Router,
    private packageService: PackageService
  ) {}

  ngOnInit(){
    this.loadPackges();
  }

  loadPackges(){
    this.packageService.getAll().subscribe((res: any)=>{
      this.packages = res;
    })
  }

  create() {
    if (!this.form.title || !this.form.packageId) {
      alert('Title & Package required');
      return;
    }

    if (!this.form.days || this.form.days.length === 0) {
    this.form.days = [
      {
        day: 1,
        title: 'Day 1',
        activities: []
      }
    ];
  }

    this.loading = true;

   

    this.itineraryService.create(this.form).subscribe({
      next: (res: any) => {
        this.loading = false;

        alert('Itinerary created ✅');

        // redirect to edit page
        this.router.navigate(['/itinerary/edit', res.data._id]);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert('Error creating itinerary');
      }
    });
  }

  generateDays() {
  this.form.days = [];

  for (let i = 1; i <= this.form.duration; i++) {
    this.form.days.push({
      day: i,
      title: `Day ${i}`,
      activities: []
    });
  }
}
}