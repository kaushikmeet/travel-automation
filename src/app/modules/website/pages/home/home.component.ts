import { Component } from '@angular/core';
import { PackageService } from '../../../packages/package.service';
import { DestinationService } from '../../../destinations/destination.service';
import { ItineraryService } from '../../../itinerary/services/itinerary.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { RouterLink } from '@angular/router';
import { PackageSearchComponent } from "../../../packages/pages/package-search/package-search.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, PackageSearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  destinations: any [] = [];
  recommendedPackages: any [] = [];
  recentItineraries: any []=[];

  readonly imageUrl = `${environment.imagesUrl}/uploads/`;

  constructor(
    private packageService: PackageService,
    private destService: DestinationService,
    private itineraryService: ItineraryService
  ){}
  ngOnInit(){
    this.packageService.getRecommended().subscribe(data => this.recommendedPackages = data);
    this.destService.getPopular().subscribe((res: any)=>{this.destinations = res.data;})
    this.itineraryService.getRecent().subscribe(data => this.recentItineraries = data);
  }
}
