import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PackageService } from '../../package.service';
import { Router } from '@angular/router';
import { DestinationService } from '../../../destinations/destination.service';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-package-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './package-create.component.html',
  styleUrl: './package-create.component.css'
})
export class PackageCreateComponent {

  packageform!: FormGroup;
  destinations: any[] = [];
  selectedFiles: File[] = [];
  previewImages: string[] = [];

  constructor(
    private fb: FormBuilder,
    private packageService: PackageService,
    private router: Router,
    private destiSRV: DestinationService,
    private toastr: ToastService
  ) {}

  ngOnInit() {
    this.packageform = this.fb.group({
      title: ["", Validators.required],
      destination: ["", Validators.required],
      price: ["", Validators.required],
      days: ["", Validators.required],
      nights: ["", Validators.required],
      description: [""],
      maxTravelers: [""],
      itinerary: this.fb.array([])
    });

    this.addDay();

    this.destiSRV.getAll().subscribe(res => {
      this.destinations = res;
    });
  }

  // ✅ itinerary getter
  get itinerary(): FormArray {
    return this.packageform.get('itinerary') as FormArray;
  }

  // ✅ add day
  addDay() {
    this.itinerary.push(this.fb.group({
      day: [this.itinerary.length + 1],
      title: ['', Validators.required],
      description: ['', Validators.required]
    }));
  }

  // ✅ remove day
  removeDay(i: number) {
    this.itinerary.removeAt(i);
  }

  // ✅ MULTIPLE FILES + PREVIEW
  
  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFiles = Array.from(event.target.files);
    }
  }

  submit() {
    if (this.packageform.invalid) return;

    const formData = new FormData();
    const val = this.packageform.value;

    // Append Simple Fields
    formData.append('title', val.title);
    formData.append('description', val.description);
    formData.append('destination', val.destination);
    formData.append('price', val.price);
    formData.append('days', val.days);
    formData.append('nights', val.nights);
    formData.append('maxTravelers', val.maxTravelers);

    // Append Itinerary as a JSON String (Node will parse this)
    formData.append('itinerary', JSON.stringify(val.itinerary));

    // Append Images
    this.selectedFiles.forEach(file => {
      formData.append('images', file, file.name);
    });

    this.packageService.create(formData).subscribe(() => {
      this.toastr.success("Package Create Successfull");
      this.router.navigate(['/packages']);
    });
  }

}
