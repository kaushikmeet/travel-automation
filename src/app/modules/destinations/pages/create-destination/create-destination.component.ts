import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { DestinationService } from '../../destination.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-destination',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-destination.component.html',
  styleUrl: './create-destination.component.css'
})

export class CreateDestinationComponent {
  destionationform!: FormGroup;
  selectedFiles: File[] = []; // Store actual image files here

  constructor(
    private fb: FormBuilder,
    private destinationSRV: DestinationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.destionationform = this.fb.group({
      name: ["", Validators.required],
      country: ["", Validators.required],
      city: ["", Validators.required],
      description: [""],
      bestSeason: [""],
      averagePrice: [null],
      popularAttractions: this.fb.array([this.fb.control("")]),
      places: this.fb.array([])
    });
  }

  // Getters for FormArrays
  get attractions() { return this.destionationform.get('popularAttractions') as FormArray; }
  get places() { return this.destionationform.get('places') as FormArray; }

  // File Handling
  onFileSelect(event: any) {
    const files = event.target.files;
    if (files) {
      this.selectedFiles = Array.from(files);
    }
  }

  addAttraction() { this.attractions.push(this.fb.control("")); }
  
  addPlace() {
    const placeGroup = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      image: ['']
    });
    this.places.push(placeGroup);
  }

  submit() {
  const formData = new FormData();

  // Append simple strings
  formData.append('name', this.destionationform.value.name);
  formData.append('country', this.destionationform.value.country);
  formData.append('city', this.destionationform.value.city);
  formData.append('description', this.destionationform.value.description);
  formData.append('bestSeason', this.destionationform.value.bestSeason);
  formData.append('averagePrice', this.destionationform.value.averagePrice);

  // FIX: Convert arrays/objects to JSON strings for Multipart compatibility
  formData.append('places', JSON.stringify(this.destionationform.value.places));
  formData.append('popularAttractions', JSON.stringify(this.destionationform.value.popularAttractions));

  // Append images
  this.selectedFiles.forEach((file) => {
    formData.append('images', file);
  });

  // Call your service
  this.destinationSRV.create(formData).subscribe({
    next: (res) => {
      console.log('Success!', res);
      alert("create succefull!");
    },
    error: (err) => console.error('Error Details:', err)
  });
}

  removePlace(index: number) {
    this.places.removeAt(index);
  }
}