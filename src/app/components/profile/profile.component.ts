import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';
import { User } from '../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:User= {
    id: 0,
    userName: '',
    name: '',
    mobile: '',
    // password:'',
    email: '',
    isActive: false,
    createdOn:new Date(),
    role: '',
    age: 0,
  }


  constructor(private login: LoginServiceService) { }

  ngOnInit(): void {
    this.login.getCurrentUser(localStorage.getItem('userName')).subscribe(
      (res: any) => this.user = res);
  }
}
