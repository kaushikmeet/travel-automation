import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PackageService } from '../../package.service';
import { Router } from '@angular/router';
import { DestinationService } from '../../../destinations/destination.service';

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
    private destiSRV: DestinationService
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
    const files = event.target.files;

    this.selectedFiles = [];
    this.previewImages = [];

    for (let file of files) {
      this.selectedFiles.push(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.previewImages.push(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  // ✅ SUBMIT (IMPORTANT FIX)
  submit() {
    const formData = new FormData();

    // append normal fields
    Object.keys(this.packageform.value).forEach(key => {
      if (key !== 'itinerary') {
        formData.append(key, this.packageform.value[key]);
      }
    });

    // ✅ correct itinerary
    formData.append(
      "itinerary",
      JSON.stringify(this.packageform.value.itinerary)
     );
    //  console.log(this.packageform.value.itinerary);

    // ✅ append images
    this.selectedFiles.forEach(file => {
      formData.append("images", file);
    });

    // ✅ SEND FORMDATA (FIXED)
    this.packageService.create(formData).subscribe((res: any) => {
      // console.log(res);
      alert("Package created");
      this.packageform.reset();
      this.router.navigate(['/packages/package-list']);
    });
  }
}
