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

  constructor(
    private fb: FormBuilder,
    private destinationSRV: DestinationService,
    private router: Router
  ) {}

  ngOnInit() {

    // ✅ FIRST create form
    this.destionationform = this.fb.group({
      name: ["", Validators.required],
      country: ["", Validators.required],
      city: ["", Validators.required],
      description: [""],
      bestSeason: [""],
      averagePrice: [""],

      images: this.fb.array([]),
      popularAttractions: this.fb.array([]),
      places: this.fb.array([])
    });

    // ✅ THEN add default fields
    this.addImage();
    this.addAttraction();
    this.addPlace();
  }

  // ✅ GETTERS
  get images(): FormArray {
    return this.destionationform.get('images') as FormArray;
  }

  get attractions(): FormArray {
    return this.destionationform.get('popularAttractions') as FormArray;
  }

  get places(): FormArray {
    return this.destionationform.get('places') as FormArray;
  }

  // ✅ ADD METHODS

  addImage() {
    this.images.push(this.fb.control(""));
  }

  addAttraction() {
    this.attractions.push(this.fb.control(""));
  }

  addPlace() {
    this.places.push(
      this.fb.group({
        name: [""],
        description: [""],
        image: [""]
      })
    );
  }

  // ✅ REMOVE METHODS (optional but recommended)
  removeImage(i: number) {
    this.images.removeAt(i);
  }

  removeAttraction(i: number) {
    this.attractions.removeAt(i);
  }

  removePlace(i: number) {
    this.places.removeAt(i);
  }

  // ✅ SUBMIT
  submit() {

    let data = this.destionationform.value;

    // clean empty values
    data.images = data.images.filter((i: any) => i);
    data.popularAttractions = data.popularAttractions.filter((i: any) => i);
    data.places = data.places.filter((p: any) => p.name);

    this.destinationSRV.create(data).subscribe(() => {
      alert("Destination Created");
      this.router.navigate(['/destinations/destination-list']);
    });
  }
}