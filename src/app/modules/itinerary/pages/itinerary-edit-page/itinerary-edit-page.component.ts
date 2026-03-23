import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
// ... other imports
import { ToastService } from '../../../../core/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { ItineraryService } from '../../services/itinerary.service';

@Component({
  selector: 'app-itinerary-edit-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DragDropModule,
  ],
  templateUrl: './itinerary-edit-page.component.html',
  styleUrl: './itinerary-edit-page.component.css'
})

export class ItineraryEditPageComponent implements OnInit, OnDestroy {
  itinerary: any;
  loading = false;
  isSaving = false;
  collapsed: { [key: number]: boolean } = {};

  // ✅ 1. Create a Subject for the auto-save stream
  private autoSaveSubject = new Subject<any>();
  private autoSaveSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private itineraryService: ItineraryService,
    private toastr: ToastService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadItinerary(id);
    this.autoSaveSubscription = this.autoSaveSubject.pipe(
      debounceTime(2000), 
    ).subscribe(() => {
      this.saveToServer();
    });
  }

  // ✅ 3. Cleanup to prevent memory leaks
  ngOnDestroy() {
    if (this.autoSaveSubscription) {
      this.autoSaveSubscription.unsubscribe();
    }
  }

  loadItinerary(id: string) {
    this.loading = true;
    this.itineraryService.getById(id).subscribe((res: any) => {
      this.itinerary = res.data;
      this.itinerary.days.forEach((d: any) => {
        if (!d.meals) d.meals = { breakfast: false, lunch: false, dinner: false };
      });
      this.loading = false;
    });
  }

  // Triggered by HTML (ngModelChange), DragDrop, Add/Remove actions
  autoSave() {
    this.isSaving = true; 
    this.autoSaveSubject.next(this.itinerary);
  }

  saveToServer() {
    // Only save if itinerary exists and we aren't already mid-request
    if (!this.itinerary?._id) return;

    this.itineraryService.update(this.itinerary._id, this.itinerary)
      .subscribe({
        next: () => {
          this.isSaving = false;
          this.toastr.success("Saved Successfully");
        },
        error: () => {
          this.isSaving = false;
          this.toastr.error("Save Failed");
        }
      });
  }

  // --- UI Actions (Keep these, just call this.autoSave()) ---

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.itinerary.days, event.previousIndex, event.currentIndex);
    this.itinerary.days.forEach((d: any, i: number) => d.day = i + 1);
    this.autoSave();
  }

  addDay() {
    const nextDay = this.itinerary.days.length + 1;
    this.itinerary.days.push({
      day: nextDay,
      title: `Day ${nextDay}`,
      description: '',
      activities: [],
      meals: { breakfast: false, lunch: false, dinner: false },
      stay: ''
    });
    this.autoSave();
  }

  removeDay(index: number) {
    this.itinerary.days.splice(index, 1);
    this.itinerary.days.forEach((d: any, i: number) => d.day = i + 1);
    this.autoSave();
  }

  addActivity(day: any) {
    day.activities.push('');
    this.autoSave();
  }

  removeActivity(day: any, i: number) {
    day.activities.splice(i, 1);
    this.autoSave();
  }

  toggleDay(i: number) {
    this.collapsed[i] = !this.collapsed[i];
  }

  trackByFn(index: number, item: any): any {
  return index; // or item.id if it's an object
}
}