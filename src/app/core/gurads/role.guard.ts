// core/guards/role.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../modules/auth/auth.service';
import { ToastService } from '../services/toast.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const toast = inject(ToastService);

  const user = auth.user(); // Your Signal or Getter
  const expectedRoles = route.data['roles'] as string[];

  if (user && expectedRoles.includes(user.role)) {
    return true;
  }

  toast.error("Access Denied: You don't have the required permissions.");
  router.navigate(['/dashboard']); 
  return false;
};