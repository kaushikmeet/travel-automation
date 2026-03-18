import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private api = environment.baseURL + '/destinations';
  

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get<any[]>(`${this.api}`);
  }
  
  getById(id:string){
    return this.http.get<any>(`${this.api}/${id}`);
  }

  create(data:any){
    const token = localStorage.getItem("token")
    return this.http.post(`${this.api}`, data,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );
  }

  update(id:string, data:any){
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id:string){
    return this.http.delete(`${this.api}/${id}`);
  }
}
