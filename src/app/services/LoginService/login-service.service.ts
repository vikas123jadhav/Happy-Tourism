import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  

  constructor(private http: HttpClient, private router: Router) { }
 
  public generateToken(userLoginData: any) {
    return this.http.post(`${environment.baseUrl}/authenticate`, userLoginData);
  }

  public getCurrentUser(userName: any) {
    let user = this.http.get(`${environment.baseUrl}/current-user/${userName}` );
    return user;
  }

  public loginUser(token: any) {
    console.log(token);
    localStorage.setItem('token', token.jwtResponse);
    return true;
  }

  // to check that admin is logged or not
  public isUserLoggedIn() {
    let token = localStorage.getItem('token');
    if (token == undefined || token == '' || token == null) {
      return false;
    }
    else {
      return true;
    }
  }

  // for logout the User
  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    localStorage.clear();
    return true;
  }

  public getToken() {
    return localStorage.getItem('token');
  }


  // public setUser(user: any) {
  //   localStorage.setItem('user', JSON.parse(user));
  // }


  public getUserType() {
    let user = this.getUser();
    return user.role;
  }
  //get user

  public getUser() {

    this.getCurrentUser(localStorage.getItem('userName')).subscribe(
      (user: any) => {
        // console.log(user);
        user = JSON.stringify(user);
        localStorage.setItem('user', user);

        user = JSON.parse(user);
      });

    let userStr = localStorage.getItem("user");
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {

    }

  }
}
