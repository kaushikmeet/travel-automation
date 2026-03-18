import { Component } from '@angular/core';
import { DestinationService } from '../../destination.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-destination-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './destination-list.component.html',
  styleUrl: './destination-list.component.css'
})
export class DestinationListComponent {
  destinations: any[] = [];

  constructor(private destinationSRV: DestinationService){}

  ngOnInit(){
    this.load();
  }

  load(){
    this.destinationSRV.getAll().subscribe(res=>{
      this.destinations = res;
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