import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PackageService } from '../../package.service';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-package-list',
  imports: [CommonModule, RouterLink ],
  templateUrl: './package-list.component.html',
  styleUrl: './package-list.component.css'
})
export class PackageListComponent {
  packages: any [] = [];
  imageUrl = environment.imagesUrl + '/uploads/';

  constructor(
    private packageService: PackageService
  ){}

  ngOnInit(){
    this.loadPackages();
  }
  
  loadPackages(){
    this.packageService.getAll().subscribe(res=>{
      this.packages= res;
    });
  }

  delete(id:string){
    if(confirm("delete this package")){
      this.packageService.delete(id).subscribe(()=>{
        this.loadPackages();
      })
    }
  }
}
