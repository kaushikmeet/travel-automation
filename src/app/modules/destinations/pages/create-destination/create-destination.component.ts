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
  if (this.destionationform.invalid) {
    alert("Please fill in all required fields");
    return;
  }

  const formData = new FormData();
  const val = this.destionationform.value;

  // 1. Simple fields
  formData.append('name', val.name);
  formData.append('country', val.country);
  formData.append('city', val.city);
  formData.append('description', val.description);
  formData.append('bestSeason', val.bestSeason);
  formData.append('averagePrice', val.averagePrice);

  // 2. Arrays (Stringify for FormData)
  formData.append('popularAttractions', JSON.stringify(val.popularAttractions.filter((a: any) => a)));
  formData.append('places', JSON.stringify(val.places));

  // 3. Files (The Gallery)
  this.selectedFiles.forEach(file => {
    formData.append('images', file, file.name);
  });

  this.destinationSRV.create(formData).subscribe({
    next: () => {
      alert("Destination Created Successfully!");
      this.router.navigate(['/destinations/destination-list']);
    },
    error: (err) => console.error("Creation failed", err)
  });
}

  removePlace(index: number) {
    this.places.removeAt(index);
  }
}