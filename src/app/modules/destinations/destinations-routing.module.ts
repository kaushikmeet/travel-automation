import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DestinationListComponent } from './pages/destination-list/destination-list.component';
import { DestinationDetailsComponent } from './pages/destination-details/destination-details.component';
import { CreateDestinationComponent } from './pages/create-destination/create-destination.component';
import { UpdateDestinationComponent } from './pages/update-destination/update-destination.component';

const routes: Routes = [
  {path:"destination-list", component: DestinationListComponent},
  {path:"create", component: CreateDestinationComponent},
  {path:"update/:id", component: UpdateDestinationComponent},
  {path:"detail/:slug", component: DestinationDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DestinationsRoutingModule { }
