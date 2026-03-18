import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinationService } from '../../destination.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-destination',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-destination.component.html',
  styleUrl: './update-destination.component.css'
})
export class UpdateDestinationComponent implements OnInit {

  form!: FormGroup;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private service: DestinationService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // ✅ 1. Create form FIRST
    this.form = this.fb.group({
      name: [""],
      country: [""],
      city: [""],
      description: [""],
      bestSeason: [""],
      averagePrice: [""]
    });

    this.id = this.route.snapshot.paramMap.get("id")!;

    this.service.getById(this.id).subscribe(res => {
      this.form.patchValue(res);
    });
  }

  goDestionationList(){
    this.router.navigate(['/destinations/destination-list'])
  }

  // ✅ Update
  update(){
    this.service.update(this.id, this.form.value).subscribe(() => {
      alert("Updated Successfully");
      this.router.navigate(['/destinations/destination-list']);
    });
  }
}