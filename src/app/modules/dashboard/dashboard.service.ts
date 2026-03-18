import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private api = environment.baseURL + '/analytics';

  constructor(private http: HttpClient) { }
   getDashboard(){
    return this.http.get(this.api);
   }
}
