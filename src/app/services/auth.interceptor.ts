import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginServiceService } from "../services/LoginService/login-service.service";



@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginServices: LoginServiceService) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    let newReq = req;
    let token = this.loginServices.getToken()
    //  console.log("INTERCEPTOR" , token);

    if (token != null) {
      newReq = newReq.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': 'true',
          Authorization: 'Bearer ' + token
        }
      })
      //console.log("new Request :: ",newReq);
    }
    return next.handle(newReq)
    // let token=this.adminLoginServce.getToken();
    // console.log("INTERCEPTOR" , token);
    // let jwtToken= req.clone({
    //    setHeaders: {
    //     Authorization:'Bearer '+token
    //    }
    // })
    // return next.handle(jwtToken);
  }
}