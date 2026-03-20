import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageListComponent } from './pages/package-list/package-list.component';
import { PackageCreateComponent } from './pages/package-create/package-create.component';
import { PackageDetailsComponent } from './pages/package-details/package-details.component';
import { PackageSearchComponent } from './pages/package-search/package-search.component';
import { AuthGuard } from '../../core/gurads/auth.guard';
import { roleGuard } from '../../core/gurads/role.guard';
import { UpdatePackageComponent } from './pages/update-package/update-package.component';

const routes: Routes = [
  {path:
    "package-list",
    canActivate: [AuthGuard, roleGuard],
    data:{roles: ['admin']}, 
    component:PackageListComponent
  },
  
  {path:
    "create-package", 
    canActivate: [AuthGuard, roleGuard],
    data:{roles: ['admin']},
    component:PackageCreateComponent
  },

  {
    path:"update-package/:id",
    canActivate:[AuthGuard, roleGuard],
    data:{roles: ['admin']},
    component: UpdatePackageComponent
  },

  {path:"package-details/:slug", component:PackageDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PackagesRoutingModule { }
