import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageService } from '../../package.service';

@Component({
  selector: 'app-package-details',
  imports: [CommonModule],
  templateUrl: './package-details.component.html',
  styleUrl: './package-details.component.css'
})
export class PackageDetailsComponent {
 package: any;

 constructor(
  private route: ActivatedRoute,
  private packageService: PackageService
 ){}

 ngOnInit(){
  const id= this.route.snapshot.paramMap.get("id");
  this.packageService.getById(id!).subscribe(res=>{
    this.package = res;
  })
 }
}
