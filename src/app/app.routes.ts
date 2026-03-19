import { Routes } from '@angular/router';

import { roleGuard } from './core/gurads/role.guard';
import { AuthGuard } from './core/gurads/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path:"", 
        loadChildren:()=>import('./modules/website/website.module').then(m=>m.WebsiteModule)
      },

      /* AUTH */
      {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule)
      },

      /* DASHBOARD */
      {
        path: 'dashboard',
        canActivate: [AuthGuard, roleGuard],
        data: { roles: ['admin', 'agent', 'user'] },
        loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
      },

      /* USERS - Strictly Admin */
      {
        path: 'users',
        canActivate: [AuthGuard, roleGuard],
        data: { roles: ['admin'] },
        loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
      },

      /* PAYMENTS */
      {
        path: 'payments',
        canActivate: [AuthGuard, roleGuard],
        data: { roles: ['admin', 'agent'] },
        loadChildren: () => import('./modules/payments/payments.module').then(m => m.PaymentsModule)
      },

      /* BOOKINGS */
      {
        path: 'bookings',
        canActivate: [AuthGuard, roleGuard],
        data: { roles: ['admin', 'agent', 'user'] },
        loadChildren: () => import('./modules/bookings/bookings.module').then(m => m.BookingsModule)
      },

	  {
		  path: 'destinations',
		  loadChildren: () =>
			import('./modules/destinations/destinations.module').then(m => m.DestinationsModule)
		},

		/* PACKAGES */

		{
		  path: 'packages',
		  loadChildren: () =>
			import('./modules/packages/packages.module').then(m => m.PackagesModule)
		},

		{
		  path:'itinerary',
		  loadChildren: ()=>
			import('./modules/itinerary/itinerary.module').then(m=> m.ItineraryModule)
	  },
	  {
		  path: 'reviews',
		  loadChildren: () =>
			import('./modules/reviews/reviews.module').then(m => m.ReviewsModule)
	  },
    ]
  }
];