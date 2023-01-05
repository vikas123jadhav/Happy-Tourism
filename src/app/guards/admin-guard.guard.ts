import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginServiceService } from '../services/LoginService/login-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  
  
  role:any;
  constructor(private loginServices:LoginServiceService , private router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      this.role=localStorage.getItem('role');
    if(this.loginServices.isUserLoggedIn() && this.role=='ADMIN'){
      return true;
    }

    this.router.navigate(['login'])
    
    return false;
  }
  
}
