import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { toObservable } from '@angular/core/rxjs-interop';

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private api = environment.baseURL + '/auth';

  private _user = signal<User | null>(this.getStoredUser());

  // ✅ COMPUTED
  user = computed(() => this._user());
  isLoggedIn = computed(() => this.user() !== null);

  authState$ = toObservable(this.isLoggedIn);

  constructor(private http: HttpClient, private router: Router) {}

  login(data: any) {
    return this.http.post<any>(`${this.api}/login`, data);
  }

  register(data:any){
    return this.http.post(`${this.api}/register`, data)
  }

  // auth.service.ts
    saveAuth(response: any) {
      const authData = response.data || response; 
      const token = authData.token;
      const user = authData.user;

      if (token) {
        localStorage.setItem('token', token);
      }

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this._user.set(user); 
      }
    }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');

    this._user.set(null); 

    this.router.navigate(['/auth/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  private getStoredUser() {
    const user = localStorage.getItem('user');

    if (!user || user === 'undefined' || user === 'null') {
      return null;
    }

    try {
      return JSON.parse(user);
    } catch {
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

getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}
}