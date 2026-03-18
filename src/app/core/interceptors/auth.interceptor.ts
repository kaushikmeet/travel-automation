import { HttpInterceptorFn } from '@angular/common/http'
import { inject } from '@angular/core'
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs'
import { AuthService } from '../../modules/auth/auth.service'

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService)

  const token = auth.getToken()

  let cloned = req

  if (token) {
    cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return next(cloned).pipe(

    catchError((err)=>{

      if(err.status === 401){
        auth.logout()
      }

      return throwError(()=>err)
    })

  )
}