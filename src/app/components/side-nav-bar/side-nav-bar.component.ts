import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';
import { UserServiceService } from 'src/app/services/UserService/user-service.service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.css']
})
export class SideNavBarComponent {

  @Input() sideNavStatus: boolean = false;
  loggedIn = false;
  role: any;
  userId: any;
  @Input() totalItem: any = 0;

  constructor(private userLoginService: LoginServiceService, private router: Router,
    private userService: UserServiceService) { }
 
  ngOnInit(): void {
    this.loggedIn = this.userLoginService.isUserLoggedIn()
    this.role = localStorage.getItem('role');


    // this.userLoginService.getCurrentUser(localStorage.getItem('userName')).subscribe(
    //   (res: any) =>{ 
    //     this.userId = res.id;
    //     this.userService.getAllCarts(this.userId).subscribe(
    //       (data:any)=>{
    //         console.log(data)
    //         this.totalItem = data.length;
    //       }
    //     )
    //   });
  }

  reload() {
    location.reload();
  }
  logoutUser() {
    this.userLoginService.logout()
    this.loggedIn = false;
    window.location.href="/home";
  }

  getTotalPakage() {
  }

}
