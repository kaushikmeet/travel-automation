import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ItineraryService } from '../../services/itinerary.service';

import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastService } from '../../../../core/services/toast.service';


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
export class ItineraryEditPageComponent implements OnInit {

  itinerary: any;
  loading = false;

  collapsed: { [key: number]: boolean } = {};
  autoSaveTimer: any;
  isSaving = false;

  constructor(
    private route: ActivatedRoute,
    private itineraryService: ItineraryService,
    private toastr: ToastService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadItinerary(id);
  }

  loadItinerary(id: string) {
    this.itineraryService.getById(id).subscribe((res: any) => {
      this.itinerary = res.data;

      // ✅ Ensure meals exist
      this.itinerary.days.forEach((d: any) => {
        if (!d.meals) {
          d.meals = {
            breakfast: false,
            lunch: false,
            dinner: false
          };
        }
      });
    });
  }

  // ✅ Drag Drop
  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.itinerary.days, event.previousIndex, event.currentIndex);

    this.itinerary.days.forEach((d: any, i: number) => {
      d.day = i + 1;
    });

    this.autoSave();
  }

  // ✅ Collapse Toggle
  toggleDay(i: number) {
    this.collapsed[i] = !this.collapsed[i];
  }

  // ✅ Add / Remove Day
  addDay() {
    const nextDay = this.itinerary.days.length + 1;

    this.itinerary.days.push({
      day: nextDay,
      title: `Day ${nextDay}`,
      description: '',
      activities: [],
      meals: {
        breakfast: false,
        lunch: false,
        dinner: false
      },
      stay: ''
    });

    this.autoSave();
  }

  removeDay(index: number) {
    this.itinerary.days.splice(index, 1);

    this.itinerary.days.forEach((d: any, i: number) => {
      d.day = i + 1;
    });

    this.autoSave();
  }

  // Activities
  addActivity(day: any) {
    day.activities.push('');
    this.autoSave();
  }

  removeActivity(day: any, i: number) {
    day.activities.splice(i, 1);
    this.autoSave();
  }

  autoSave() {
  clearTimeout(this.autoSaveTimer);
  this.autoSaveTimer = setTimeout(() => {
    this.saveToServer();
  }, 25000); 
}

  // Auto Save
 saveToServer() {
  this.isSaving = true;

  this.itineraryService.update(this.itinerary._id, this.itinerary)
    .subscribe({
      next: () => {
        this.isSaving = false;
        this.toastr.success("Saved Susscessfull")
        // console.log('Saved');
      },
      error: () => {
        this.isSaving = false;
        this.toastr.error("Save Failed");
        // console.log('Save failed');
      }
    });
 }
}