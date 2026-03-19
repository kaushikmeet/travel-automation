import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItineraryPageComponent } from './pages/itinerary-page/itinerary-page.component';
import { ItineraryEditPageComponent } from './pages/itinerary-edit-page/itinerary-edit-page.component';
import { ItineraryDetailComponent } from './components/itinerary-detail/itinerary-detail.component';
import { ItineraryFormComponent } from './components/itinerary-form/itinerary-form.component';
import { AuthGuard } from '../../core/gurads/auth.guard';

const routes: Routes = [
  // 📄 List all itineraries
  {
    path: 'itinenary-page',
    component: ItineraryPageComponent,
  },

  {
    path: 'create',
    canActivate: [AuthGuard],
    data: {roles: ['admin']},
    component: ItineraryFormComponent
  },

  {
    path: 'edit/:id',
    canActivate: [AuthGuard],
    data: {roles: ['user']},
    component: ItineraryEditPageComponent,
  },

  {
    path: ':id',
    canActivate: [AuthGuard],
    data: {roles: ['user']},
    component: ItineraryDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItineraryRoutingModule {}