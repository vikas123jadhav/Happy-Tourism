import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  result: any;
  role: any;
  name: any;

  public loggedIn = false;
  public userLoginData = {
    userName: '',
    password: ''
  };

  constructor(private loginService: LoginServiceService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.loggedIn = this.loginService.isUserLoggedIn();
  }

  onSubmit() {
    if ((this.userLoginData.userName != '' && this.userLoginData.password != '')
      && (this.userLoginData.userName != null && this.userLoginData.password != null)) {
      this.loginService.generateToken(this.userLoginData).subscribe(
        (response: any) => {
          this.loginService.loginUser(response);
          this.loginService.getCurrentUser(this.userLoginData.userName).subscribe(
            (user: any) => {
              user.password = '';
              user = JSON.stringify(user);
              // localStorage.setItem('user', user);
              user = JSON.parse(user);
              localStorage.setItem('role', user.role);
              localStorage.setItem('name', user.name);
              localStorage.setItem('userName', user.userName);
              this.role = localStorage.getItem('role');
              if (this.role == 'ADMIN') window.location.href = "/graphs"
              else if (this.role == 'NORMAL') window.location.href = "/graphs"
            }
          )
        },
        error => {
          console.log("error!!")
          console.log(error);
          this.snack.open('Invalid Credentials!!', 'Try Again', {
            duration: 3000,
          })
        }
      )
    }
    else {
      console.log("Fields are Empty !!");
      this.snack.open('Fields are Empty!!', 'Try Again', {
        duration: 3000,
      })
    }
  }
}
