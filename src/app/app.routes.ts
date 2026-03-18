import { Routes } from '@angular/router';

import { roleGuard } from './core/gurads/role.guard';
import { AuthGuard } from './core/gurads/auth.guard';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
 {
  path:'',
  component: LayoutComponent,
  children:[
    {
      path: '',
      redirectTo: 'packages',
      pathMatch: 'full'
    },

    /* AUTH MODULE */
    {
      path: 'auth',
      loadChildren: () =>
        import('./modules/auth/auth.module').then(m => m.AuthModule)
    },

    /* DASHBOARD */

    {
      path: 'dashboard',
      canActivate: [AuthGuard],
      loadChildren: () =>
        import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
    },

    /* USERS (ADMIN ONLY) */

    {
      path: 'users',
      canActivate: [AuthGuard, roleGuard],
      data: { roles: ['admin'] },
      loadChildren: () =>
        import('./modules/users/users.module').then(m => m.UsersModule)
    },

    /* DESTINATIONS */

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

    /* BOOKINGS */

    {
      path: 'bookings',
      canActivate: [AuthGuard],
      loadChildren: () =>
        import('./modules/bookings/bookings.module').then(m => m.BookingsModule)
    },

    /* PAYMENTS */

    {
      path: 'payments',
      canActivate: [AuthGuard],
      loadChildren: () =>
        import('./modules/payments/payments.module').then(m => m.PaymentsModule)
    },

    /* REVIEWS */

    {
      path: 'reviews',
      loadChildren: () =>
        import('./modules/reviews/reviews.module').then(m => m.ReviewsModule)
    },

    /* FALLBACK */

    {
      path: '**',
      redirectTo: 'packages'
    }

  ]
 }
];