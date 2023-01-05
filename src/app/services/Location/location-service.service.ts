import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LocationServiceService {

 

  constructor(private http: HttpClient) { }

  saveLocation(LocationObject: any) {
    return this.http.post(`${environment.baseUrl}/storeLocation`, LocationObject);
  }


  getAllLocations() {
    return this.http.get(`${environment.baseUrl}/getAllLocation`);
  }

  deleteLocation(id: any) {
    return this.http.delete(`${environment.baseUrl}/deleteLocationById/` + id);
  }

}
