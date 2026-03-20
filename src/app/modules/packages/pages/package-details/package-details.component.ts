import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PackageService } from '../../package.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-package-details',
  imports: [CommonModule],
  templateUrl: './package-details.component.html',
  styleUrl: './package-details.component.css'
})
export class PackageDetailsComponent implements OnInit {
 package: any;

 readonly imgURL = `${environment.imagesUrl}/uploads/`;

 constructor(
  private route: ActivatedRoute,
  private packageService: PackageService
 ){}

 ngOnInit(){
   this.route.paramMap.subscribe(params=>{
    const slug = params.get('slug');
    if(slug){
      this.packageService.getBySlug(slug).subscribe(res =>{
        this.package = res;
      })
    }
   })
 }
}
