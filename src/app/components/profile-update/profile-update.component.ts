import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';

import { Form, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { whiteSpaceVallidator } from 'src/app/Custom-Validators/whiteSpaceVallidator.validator';
import { userNameSpecialCharValidator } from 'src/app/Custom-Validators/userNameSpecialCharValidator.validator';
import { noSpecialCharacter } from 'src/app/Custom-Validators/noSpecialCharacter.validator';
import { UserServiceService } from 'src/app/services/UserService/user-service.service';
import { User } from '../models/user';




@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  user:User= {
    id: 0,
    userName: '',
    name: '',
    mobile: '',
    email: '',
    isActive: false,
    createdOn:new Date(),
    role: '',
    age: 0,
  }
  newUser: any;
  userName: any;

  constructor(private userService: LoginServiceService,
    private userServices: UserServiceService,
    private snack: MatSnackBar,
    private router: Router,
    private loginService: LoginServiceService, private _router: ActivatedRoute,) { }

  ngOnInit(): void {
    this.userService.getCurrentUser(localStorage.getItem('userName')).subscribe(
      (res: any) => this.user = res);
  }

  formSubmit(action: any) { }

  update(action: string) {
    let role = this.user.role;
    this.checkUserName(this.user.userName);
    this.userServices.createUser(this.user).subscribe(
      (data: any) => {
        this.newUser = data;
        this.newUser = JSON.stringify(this.newUser);
        localStorage.setItem("user", this.newUser);
        localStorage.setItem('name', data.name);
        localStorage.setItem('userName', data.userName);
        this.swalFileSuccess(role);
      },
      (error) => {
        console.log(error);
        this.snackErrorOpen();
      }
    );
  }

  private checkUserName(userName: any) {
    if (this.user.userName == '' || this.user.userName == null) {
      this.snack.open('User name is Required !! ', '', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }
  }

  private swalFileSuccess(role: any) {
    Swal.fire('Successfully done !!', 'Ur Profile is Updated', 'success').then((e) => {
      window.location.href = "/profile";
    });
  }


  private snackErrorOpen() {
    this.snack.open('Something Went wrong !!', '', {
      duration: 3000,
    })
  }

  public admin = {
    name: '',
    username: '',
    age: '',
    password: '',
    mobileNo: '',
    email: '',
  };



  registerform = new FormGroup({
    NAME: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern("[a-zA-Z].*"),
      noSpecialCharacter.noSpecialChar
    ]),

    AGE: new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9]*"),
      Validators.min(10),
      Validators.max(50)
    ]),

    USERNAME: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z0-9]*.(@gmail|@yahoo|@solugenix).com"),
      userNameSpecialCharValidator.userNameSpeChar
    ]),

    // PASSWORD: new FormControl("", [
    //   Validators.required,
    //   Validators.minLength(8),
    //   Validators.maxLength(16),
    //   Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
    //   whiteSpaceVallidator.cannotContainSpace
    // ]),

    // confirmPassword: new FormControl("", [Validators.required]),

    MOBILENO: new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9]*"),
      Validators.minLength(10),
      Validators.maxLength(10)
    ]),

    EMAIL: new FormControl("", [
      Validators.required,
      Validators.pattern("[a-zA-Z0-9]*.(@gmail|@yahoo|@solugenix).com"),
      userNameSpecialCharValidator.userNameSpeChar
    ]),
  });



  get Name() {
    return this.registerform.get("NAME") as FormControl;
  }
  get Userame() {
    return this.registerform.get("USERNAME") as FormControl;
  }
  get Age() {
    return this.registerform.get("AGE") as FormControl;
  }
  // get Password() {
  //   return this.registerform.get("PASSWORD") as FormControl;
  // }
  // get ConfirmPassword() {
  //   return this.registerform.get("confirmPassword") as FormControl;
  // }
  get MobileNo() {
    return this.registerform.get("MOBILENO") as FormControl;
  }
  get Email() {
    return this.registerform.get("EMAIL") as FormControl;
  }

  registerSubmited() {
  }
}
