import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from './services/LoginService/login-service.service';
import { UserServiceService } from './services/UserService/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Happy-Tourism';
  sideNavStatus: boolean = true;
  isloggedIn = false;

  userId: any;
  totalItem: number=0;

  constructor(private userLoginService: LoginServiceService, private router: Router, private userService: UserServiceService) { }

  ngOnInit(): void {

    this.isloggedIn = this.userLoginService.isUserLoggedIn();

    if (localStorage.getItem('userName') != undefined || localStorage.getItem('userName') != null) {
      this.userLoginService.getCurrentUser(localStorage.getItem('userName')).subscribe(
        (res: any) => {
          this.userId = res.id;
          this.userService.getAllCarts(this.userId).subscribe(
            (data: any) => {
              this.totalItem = data.length;
            }
          )
        });
    }
  }


}
