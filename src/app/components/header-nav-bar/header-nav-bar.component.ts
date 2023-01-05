import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';
import { UserServiceService } from 'src/app/services/UserService/user-service.service';

@Component({
  selector: 'app-header-nav-bar',
  templateUrl: './header-nav-bar.component.html',
  styleUrls: ['./header-nav-bar.component.css']
})
export class HeaderNavBarComponent implements OnInit {


  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = true;

  public loggedIn = false;
  name: any;
  role: any;
  userId: any;
  public searchTerm !: string;

  constructor(private userLoginService: LoginServiceService, private router: Router,
    private userService: UserServiceService) { }

  ngOnInit(): void {
    this.loggedIn = this.userLoginService.isUserLoggedIn();
    if (!this.loggedIn) {
      this.router.navigateByUrl('home');
    }

    if (!this.loggedIn) { }
    else {
      this.role = localStorage.getItem('role');
      this.name = localStorage.getItem('name');
    }
  }


  sideNavToggle() {
    this.sideNavToggled.emit(this.menuStatus);
  }

  logoutUser() {
    this.userLoginService.logout();
    this.router.navigateByUrl('home');
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.userService.search.next(this.searchTerm);
  }
}
