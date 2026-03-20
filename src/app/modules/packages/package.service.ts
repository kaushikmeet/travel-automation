import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  private api = environment.baseURL + '/packages';

  constructor(private http: HttpClient) { }

  search(keyword:string){
    return this.http.get(`${this.api}?search=${keyword}`);
  }

  getAll(){
    return this.http.get<any[]>(this.api)
  }

  getById(id:string){
    return this.http.get<any>(`${this.api}/${id}`)
  }

  create(formData: FormData){
    return this.http.post(this.api,formData)
  }

  update(id:string, formData: FormData){
    return this.http.put(`${this.api}/${id}`, formData);
  }

  delete(id:string){
    return this.http.delete(`${this.api}/${id}`)
  }

  getRecommended(limit: number = 3) {
    return this.http.get<any[]>(`${this.api}/recommended?limit=${limit}`);
  }

  getBySlug(idOrSlug: string) {
    return this.http.get<any>(`${this.api}/${idOrSlug}`);
  }
}
