import { inject } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router'
import { AuthService } from '../../modules/auth/auth.service'


export const roleGuard: CanActivateFn = (route:ActivatedRouteSnapshot)=>{

  const auth = inject(AuthService)
  const router = inject(Router)

  const roles = route.data['roles']

  if(!roles.includes(auth.user()?.role)){
    router.navigate(['/dashboard'])
    return false
  }

  return true
}