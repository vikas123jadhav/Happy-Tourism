import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  

  constructor(private http: HttpClient) { }

  cartPackages: any = [];
  userId: any;
  public search = new BehaviorSubject<string>("");

  public createUser(user: any) {
    return this.http.post(`${environment.baseUrl}/addUser`, user);
  }

  public getAllCartsBookingsById(userId: number) {
    this.userId = userId;
    return this.http.get(`${environment.baseUrl}/getAllCartsBookingsById/${userId}`);

  }

  public getAllPurchasedBookingsById(userId: number) {
    return this.http.get(`${environment.baseUrl}/getAllPurchasedBookingsById/${userId}`);
  }

  // public getAllUserNames() : Observable<string[]> {
  //  return this.http.get<string[]>(`http://localhost:8080/getAllUserNames`).pipe(
  //   catchError((r: HttpErrorResponse) => throwError(r.error || 'Server error'))
  // );

  // }

  public addToCart(packageData: any) {
    this.getAllCartsBookingsById(this.userId).subscribe(
      (res: any) => {
        this.cartPackages = res;
      }
    );
    return this.http.post(`${environment.baseUrl}/addToCart`, packageData);
  }

  getCart() {
    return this.cartPackages;
  }

  getPackageById(id: any) {
    return this.http.get(`${environment.baseUrl}/getPackageById/` + id);
  }

  public getAllUserNames() {
    return this.http.get(`${environment.baseUrl}/getAllUserNames`);
  }

  public getActivePackages() {
    return this.http.get(`${environment.baseUrl}/getActivePackages`);
  }

  public getAllCarts(userId: any) {
    let cartPack = this.http.get(`${environment.baseUrl}/getAllCartsBookingsById/${userId}`);
    //  this.cartPackages =  cartPack;

    return cartPack;
  }




  public deletePackageCart(bookingId: any) {
    return this.http.get(`${environment.baseUrl}/removeFromCart/${bookingId}`);
  }


  public deleteAllCartPackage(userId: any) {
    return this.http.get(`${environment.baseUrl}/deleteAllCartPackage/${userId}`);
  }

  public calculateBill(noOfSlots: any, packageId: any) {
    return this.http.get(`${environment.baseUrl}/calculateBill/${noOfSlots}/${packageId}`);
  }

  public IsSlotsAvailable(packageId: any, bookingSlots: number) {
    return this.http.get(`${environment.baseUrl}/checkSlotsAvailable/${packageId}/${bookingSlots}`);
  }

  public storeBooking(bookingEntity: any) {
    return this.http.post(`${environment.baseUrl}/storeBooking`, bookingEntity);

  }

  public getReceipt(paymentId: any, bookedById: any) {
    return this.http.get(`${environment.baseUrl}/getReceipt/${paymentId}/${bookedById}`);
  }

  public getCheckoutBill(bookedById:any){
    return this.http.get(`${environment.baseUrl}/checkOutTotalBill/${bookedById}`);
  }

  public payCheckout(bookedById:any, paymentId:any){
    return this.http.get(`${environment.baseUrl}/checkout/${bookedById}/${paymentId}`);
  }

  public updateCart(bookingEntity:any){
    return this.http.post(`${environment.baseUrl}/updateCart`, bookingEntity);
  }
}
