import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = environment.baseURL + '/users';

  private getHeaders() {
  const token = localStorage.getItem('token');
  return {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
  };
}

  constructor(private http: HttpClient) {}

  getUsers(){
    return this.http.get<any[]>(this.api, this.getHeaders());
  }

  getUser(id:string){
    return this.http.get<any>(`${this.api}/${id}`)
  }

  createUser(data:any){
    return this.http.post(this.api, data)
  }

  updateUser(id:string,data:any){
    return this.http.put(`${this.api}/${id}`, data)
  }

  deleteUser(id:string){
    return this.http.delete(`${this.api}/${id}`, this.getHeaders())
  }

}