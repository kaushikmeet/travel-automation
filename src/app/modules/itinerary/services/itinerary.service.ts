import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Itinerary } from '../models/itinerary';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItineraryService {
  private api = environment.baseURL +'/itinerary';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<{ data: Itinerary[] }>(this.api);
  }

  getById(id: string) {
    return this.http.get<{ data: Itinerary }>(`${this.api}/${id}`);
  }

  getByPackage(packageId: string) {
    return this.http.get<{ data: Itinerary[] }>(
      `${this.api}/package/${packageId}`
    );
  }

  create(data: Itinerary) {
    return this.http.post(this.api, data);
  }

  update(id: string, data: Partial<Itinerary>) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.api}/${id}`);
  }

  // 🔥 Update Single Day
  updateDay(id: string, day: number, data: any) {
    return this.http.patch(`${this.api}/${id}/day/${day}`, data);
  }

  // 🔥 Clone
  clone(id: string) {
    return this.http.post(`${this.api}/${id}/clone`, {});
  }
  // recent itinerary
  getRecent(limit: number = 5) {
    return this.http.get<any[]>(`${this.api}/recent?limit=${limit}`);
  }
}