import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { switchMap } from 'rxjs'
import { AuthService } from '../../modules/auth/auth.service'

export const refreshInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService)

  const token = auth.getToken()

  if (!token) return next(req)

  const payload = JSON.parse(atob(token.split('.')[1]))

  const expired = Date.now() > payload.exp * 1000

  if (!expired) return next(req)

  return auth.refreshToken().pipe(

    switchMap((res:any)=>{

      auth.saveAuth(res)

      const cloned = req.clone({
        setHeaders:{
          Authorization:`Bearer ${res.token}`
        }
      })

      return next(cloned)

    })
  )
}