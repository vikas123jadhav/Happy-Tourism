import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
	providedIn: 'root'
})
export class RozarPayServiceService {

	constructor(private http: HttpClient) {

	}

	createOrder(order: any): Observable<any> {
		return this.http.post(`${environment.baseUrl}/pg/createOrder`, {
			customerName: order.name,
			email: order.email,
			phoneNumber: order.phone,
			amount: order.amount
		}, httpOptions);
	}
}
