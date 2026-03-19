import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PackageService } from '../../package.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-package-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './package-search.component.html',
  styleUrl: './package-search.component.css'
})
export class PackageSearchComponent {
  packages: any[]=[];
  keyword='';

  constructor(private packageService: PackageService){}

  
  search(){
    this.packageService.search(this.keyword).subscribe((res:any)=>{
      this.packages = res;
    })
  }

 
}
