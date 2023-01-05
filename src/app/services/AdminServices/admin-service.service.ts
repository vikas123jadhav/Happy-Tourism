import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

 
  constructor(private http: HttpClient) { }

  getAllUsers() {
    let user = this.http.get(`${environment.baseUrl}/getAllUsers`);
    console.log(user);
    return user;
  }

  deleteUserById(id: any) {
    let result = this.http.delete(`${environment.baseUrl}/deleteUser/${id}`);
    return result;
  }

  deletePackageById(id: any) {
    let result = this.http.delete(`${environment.baseUrl}/deletePackage/${id}`);
    return result;
  }

  reActivateUser(id: any) {
    let result = this.http.get(`${environment.baseUrl}/activateUser/${id}`);
    return result;
  }

  reActivatePackage(id: any) {
    let result = this.http.get(`${environment.baseUrl}/activatePackage/${id}`);
    return result;
  }

  getAllBookings() {
    let bookings = this.http.get(`${environment.baseUrl}/getAllBookings`);
    console.log(bookings);
    return bookings;
  }


  addPackage(packageName: any, cost: any, imgPath: any, location: any, startDate: any, endDate: any
    , description: any, slots: any, noOfPeoples: any, formData: FormData) {
    return this.http.post(`${environment.baseUrl}/storePackage/${packageName}/${cost}/${location}/${startDate}/${endDate}/${description}/${slots}/${noOfPeoples}`, formData);
  }


  getAllPackages() {
    let packages = this.http.get(`${environment.baseUrl}/getAllPackages`);
    console.log(packages);
    return packages;
  }


  getPackageById(id: any) {
    return this.http.get(`${environment.baseUrl}/getPackageById/${id}`);
  }

  updatePackage(id: any, packageName: any, cost: any, imgPath: any, location: any, startDate: any, endDate: any
    , description: any, slots: any, noOfPeoples: any, formData: FormData) {
    return this.http.post(`${environment.baseUrl}/updatePackage/${id}/${packageName}/${cost}/${location}/${startDate}/${endDate}/${description}/${slots}/${noOfPeoples}`, formData);
  }

}
