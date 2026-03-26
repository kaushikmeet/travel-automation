import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DestinationService } from '../destination.service';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-destinations-card',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './destinations-card.component.html',
  styleUrl: './destinations-card.component.css'
})
export class DestinationsCardComponent implements OnInit, OnDestroy {
  destinations: any[] = [];
  seasons = ['Winter', 'Summer', 'Monsoon', 'Spring'];
  showMobileFilters = false;
  filters = {search: '', maxPrice: 200000, season: '', sort: 'newest'};
  totalResults: number = 0;
  currentPage = 1;
  pages = [1, 2, 3];
  readonly image = environment.imagesUrl + '/uploads/';
  isSearching = false;

  private searchSubject = new Subject<string>();
  private searchSubscription?: Subscription;

  constructor(
    private destinationSRV: DestinationService
  ){}

  ngOnInit(): void {
   this.applyFilters(); 
   this.searchSubscription = this.searchSubject.pipe(
    debounceTime(500),
    distinctUntilChanged(),
   ).subscribe(searchTerm=>{
    this.filters.search = searchTerm.trim(),
    this.currentPage = 1;
    this.applyFilters();
   })
  }

applyFilters() {
  this.isSearching = true;
  this.destinationSRV.getAllFiltered(this.filters, this.currentPage).subscribe({
    next: (res) => {
      this.destinations = res.data;
      this.totalResults = res.total;
      this.isSearching = false;
      this.calculatePagination();
    },
    error: () => this.isSearching = false
  });
}
  onSearch() {
    this.searchSubject.next(this.filters.search);
  }

  ngOnDestroy(): void {
    this.searchSubscription?.unsubscribe();
  }

  toggleSeason(s: string) {
    this.filters.season = this.filters.season === s ? '' : s;
    this.applyFilters();
  }

  toggleMobileFilters() {
    this.showMobileFilters = !this.showMobileFilters;
  }

  resetFilters() {
    this.filters = { search: '', maxPrice: 200000, season: '', sort: 'newest' };
    this.applyFilters();
  }

  changePage(pageNumber: number) {
    if (this.currentPage !== pageNumber) {
      this.currentPage = pageNumber;
      this.applyFilters(); 
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
  calculatePagination() {
    const pageCount = Math.ceil(this.totalResults / 9); 
    this.pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  }
}
