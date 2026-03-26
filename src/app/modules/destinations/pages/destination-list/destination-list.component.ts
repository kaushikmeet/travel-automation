import { Component } from '@angular/core';
import { DestinationService } from '../../destination.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-destination-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './destination-list.component.html',
  styleUrl: './destination-list.component.css'
})
export class DestinationListComponent {
  destinations: any[] = [];

  readonly imageUrl = environment.imagesUrl + '/uploads/';

  constructor(private destinationSRV: DestinationService){}

  ngOnInit(){
    this.load();
  }

  load(){
    this.destinationSRV.getAll().subscribe((res:any)=>{
      this.destinations = res.data;
    })
  }

  delete(id: string){
    if(confirm("delete this destinations")){
      this.destinationSRV.delete(id).subscribe(()=>{
        this.load();
      })
    }
  }
}