import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PackageService } from '../../package.service';
import { DestinationService } from '../../../destinations/destination.service';

@Component({
  selector: 'app-update-package',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-package.component.html',
  styleUrl: './update-package.component.css'
})
export class UpdatePackageComponent {
  updatePackageform!: FormGroup;
  id!: string;
  destinations: any[] = [];
  files: File[] = [];

  constructor(
    private route: ActivatedRoute,
    private packageService: PackageService,
    private fb: FormBuilder,
    private router: Router,
    private destiSRV: DestinationService
  ){}

  ngOnInit(){
   this.updatePackageform = this.fb.group({
      title: [''],
      description: [''],
      destination: [''],
      price: [''],
      days: [''],
      nights: [''],
      maxTravelers: [''],
      itinerary: this.fb.array([])
    });

    this.id = this.route.snapshot.paramMap.get('id')!;
    
    this.destiSRV.getAll().subscribe((res:any)=>{
      this.destinations =res;
    })

    this.packageService.getById(this.id).subscribe((res:any)=>{
      this.updatePackageform.patchValue(res);
      res.itinerary.forEach((d:any)=>{
        this.itinerary.push(this.fb.group({
          day:[d.day],
          title:[d.title],
          description:[d.description]
        }))
      });
    });

    
  }

 get itinerary(): FormArray{
  return this.updatePackageform.get('itinerary') as FormArray
 }

 addDay(){
  this.itinerary.push(this.fb.group({
    day: [this.itinerary.length +1],
    title:[''],
    description:['']
  }))
 }

 removeDay(i: number){
  this.itinerary.removeAt(i);
 }

 onFileChange(e:any){
  this.files = Array.from(e.target.files);
 }
  update(){

    const formData = new FormData();

    Object.keys(this.updatePackageform.value).forEach(key=>{
      if(key !== 'itinenary'){
        formData.append(key, this.updatePackageform.value[key])
      }
    });

    formData.append(
      "itinerary", 
      JSON.stringify(this.updatePackageform.value.itinenary)
    );

    this.files.forEach(file=>{
      formData.append("images", file);
    });
  

    this.packageService.update(this.id, formData).subscribe((res: any)=>{
      // console.log(res);
      alert("package updated");
      this.updatePackageform.reset();
      this.router.navigate(['/packages/package-list']);
    })
  }
}
