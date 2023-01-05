import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmEqualValidatorDirective } from 'src/app/Custom-Validators/confirm-equal-validator.directive';
import { noSpecialCharacter } from 'src/app/Custom-Validators/noSpecialCharacter.validator';
import { userNameSpecialCharValidator } from 'src/app/Custom-Validators/userNameSpecialCharValidator.validator';
import { whiteSpaceVallidator } from 'src/app/Custom-Validators/whiteSpaceVallidator.validator';
import { SuccessErrorOpenService } from 'src/app/services/SuccErrorOpen/success-error-open.service';
import { UserServiceService } from 'src/app/services/UserService/user-service.service';
import { RegisterUser } from '../models/registerUser';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  newUser: any;
  constructor(private snack: MatSnackBar, private studentServices: UserServiceService, private router: Router,
    private sucErr: SuccessErrorOpenService) { }

  public user: RegisterUser = {
    name: '',
    userName: '',
    age: 0,
    password: '',
    mobile: '',
    email: '',
    id: 0,
    role: '',
    isActive: false,
  };

  userNames: any;

  public userMsg: string | undefined;
  public isUserValid = false;
  public isUserInValid = false;

  public VerifyUserOnKeyUP() {
    for (var item of this.userNames) {
      if ( item.toLocaleLowerCase() == this.user.userName.toLocaleLowerCase()) {
        this.isUserInValid = true;
        this.isUserValid = false;
        console.log(this.user.userName +'  '+ item)
        this.userMsg = "userName Taken - try another"
        break;
      }
      else {
        this.isUserInValid = false;
        this.isUserValid = true;
        this.userMsg = 'user Name is Available'
      }
    }
  }

  ngOnInit(): void {
    this.getAllUserNames();
  }

  getAllUserNames() {
    this.studentServices.getAllUserNames().subscribe(
      data => {
        this.userNames = data;
        console.log(data);
      },
      error=>{
           console.log('error in fetching usernames')
      }
    )
    console.log(this.userNames)
  }

  registerform = new FormGroup({
    NAME: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
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

    PASSWORD: new FormControl("", [
      Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
      Validators.minLength(8),
      Validators.maxLength(16),
      whiteSpaceVallidator.cannotContainSpace
    ]),

    confirmPassword: new FormControl("", [Validators.required,
    ]),

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
  get Password() {
    return this.registerform.get("PASSWORD") as FormControl;
  }
  get ConfirmPassword() {
    return this.registerform.get("confirmPassword") as FormControl;
  }
  get MobileNo() {
    return this.registerform.get("MOBILENO") as FormControl;
  }
  get Email() {
    return this.registerform.get("EMAIL") as FormControl;
  }


  formSubmit(action: string) {
    this.studentServices.createUser(this.user).subscribe(
      (data: any) => { 
        console.log(data);
        this.sucErr.swalSuccessFire('User');
      },
      (error) => {
        console.log(error);
        this.sucErr.snackErrorOpen();
      }
    );
  }
}
