import { Injectable, signal, computed } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { environment } from '../../environments/environment'

export interface User {
  id: string
  name: string
  email: string
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.baseURL + '/auth'
  private _user = signal<User | null>(this.getStoredUser())
  user = computed(() => this._user())
  isLoggedIn = computed(() => this.user() !== null)

  constructor(private http: HttpClient, private router: Router) {}

  login(data:any){
    return this.http.post<any>(`${this.api}/login`, data)
  }

  register(data:any){
    return this.http.post(`${this.api}/register`, data)
  }

saveAuth(response: any) {

  const token = response.token?.token
  const user = response.token?.user

  if (token) {
    localStorage.setItem('token', token)
  }

  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
    this._user.set(user)
  }

}

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('user')
     localStorage.removeItem('refreshToken')
    this._user.set(null)
    this.router.navigate(['/auth/login'])
  }

  getToken(){
    return localStorage.getItem('token')
  }

  private getStoredUser(){
    const user = localStorage.getItem('user')
    if(!user || user === 'undifined' || user === 'null'){
      return null
    }
    try{
      return JSON.parse(user);
    }catch(error){
      console.warn("Invalid user in localStorage")
      localStorage.removeItem('user');
      return null;
    }

  }

  refreshToken(){
  const refresh = localStorage.getItem('refreshToken')

  return this.http.post<any>(`${this.api}/refresh`, {
    refreshToken: refresh
  })
}
}