import { formatDate } from '@angular/common';
import { Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LocationServiceService } from 'src/app/services/Location/location-service.service';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';
import { UserServiceService } from 'src/app/services/UserService/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-normal-packages',
  templateUrl: './normal-packages.component.html',
  styleUrls: ['./normal-packages.component.css']
})
export class NormalPackagesComponent implements OnInit {

  booking = {
    bookedById: '',
    packageId: '',
    noOfSlots: 1
  }
  totalItem:any;

 

  input='';
  userId: any;
  package: any;
  searchInput: any = { packageName: '' }
  totalBill: number = 0;
  showPackage = true;
  activePackages = [{
    id: '',
    packageName: '',
    cost: '',
    imgPath: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    slots: '',
    noOfPeoples: '',
    isActive: ''
  }]
  searchKey: string = "";

  constructor(private uservice: UserServiceService, @Inject(LOCALE_ID) private locale: string,
    private login: LoginServiceService, private router: Router, private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.showPackage = true;
    this.popup = false;
    this.login.getCurrentUser(localStorage.getItem('userName')).subscribe(
      (res: any) => this.userId = res.id);;
    this.getActivePackages();
    this.uservice.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }

  bookingEntity = {
    "bookedById": '',
    "packageId": '',
    "noOfSlots": 0
  }

  toPay(packageId: any) {
    this.bookingEntity = {
      "bookedById": this.userId,
      "packageId": packageId,
      "noOfSlots": this.quantity
    }

    this.popup = false;
    this.router.navigateByUrl('pay/' + this.bookingEntity.bookedById + '/' + this.bookingEntity.packageId + '/' + this.quantity);
    this.popup = false;
  }

  getActivePackages() {
    this.uservice.getActivePackages().subscribe(
      (response: any) => {
        this.activePackages = response;
        for (let i = 0; i < response.length; i++) {
          let strtDte = formatDate(response[i].startDate, 'yyyy-MM-dd', this.locale);
          let endDte = formatDate(response[i].startDate, 'yyyy-MM-dd', this.locale);

          response[i].imgPath = "../../../assets/" + response[i].imgPath;
          response[i].startDate = strtDte;
          response[i].endDate = endDte;
        }
      },
      (error: any) => {
        console.log(error);
        console.log("error in all Packages List Fetching !!")
      }
    )
  }

  addToCart(packageId: any,slots: number) {
    this.booking = {
      bookedById: this.userId,
      packageId: packageId,
      noOfSlots: 1
    }
    this.uservice.addToCart(this.booking).subscribe(
      (response: any) => {
        Swal.fire('Successfully done !!', 'Successfuly Added to Cart,Booking ID: ' + response.id, 'success').then((e) => {
          
        });
      },
      (error: any) => {
        Swal.fire('Error', `Only ${slots} Slots are Available`, 'error');
      }
    )
  }

  popup = false;
  quantity = 1;
  public userMsg: string | undefined;

  public isUserValid = false;
  public isUserInValid = false;


  bookPopPupPackageById(id: any) {
    this.quantity = 1;
    this.uservice.getPackageById(id).subscribe(
      (response: any) => {
        let strtDte = formatDate(response.startDate, 'yyyy-MM-dd', this.locale);
        let endDte = formatDate(response.startDate, 'yyyy-MM-dd', this.locale);
        response.imgPath = "../../../assets/" + response.imgPath;
        response.startDate = strtDte;
        response.endDate = endDte;

        this.package = response;
        this.totalBill = this.quantity * this.package.cost;

        if (response.slots == 0 || response.isActive == false) {
          Swal.fire('Error', response.packageName + ':Currently Slots are Not Available', 'error').then(e => {
            this.router.navigateByUrl('normalPackages');
            this.popup = false;
            this.showPackage = true;
          });
        }
        else {
          this.popup = true;
          this.showPackage = false
        }
      }
    )
  }

  close() {
    this.popup = false;
    this.showPackage = true;
  }
  msg: string = '';

  inc(quantity: any) {
    if (this.quantity == this.package.slots) {
      console.log('slots not available')
      this.msg = `Only ${this.package.slots} Slots Availabel`
      this.quantity - 1;
    }
    else {
      this.quantity = this.quantity + 1;
      this.calculate(+this.package.id)
      this.msg = '';
    }
  }

  dec(quantity: any) {
    if (this.quantity != 1)
      this.quantity -= 1;
    this.msg = ''
    this.calculate(+this.package.id)
  }

  calculate(id: number) {
    this.uservice.calculateBill(this.quantity, this.package.id).subscribe(
      (bill: any) => {
        this.totalBill = bill;
        console.log(this.totalBill);
      }
    )
  }
  public VerifyUserOnKeyUP() {
    console.log('ava slots :' + this.package.slots);
    if (this.quantity > this.package.slots || this.quantity <= 0) {
      this.isUserInValid = true;
      this.isUserValid = false;
      console.log('ava slots :' + this.package.slots);
      this.userMsg = `Only ${this.package.slots}  Slots are Available`;
    }
    else {
      this.isUserInValid = false;
      this.isUserValid = true;
      this.userMsg = `Slots Are Available`;
    }
  }

 
}
