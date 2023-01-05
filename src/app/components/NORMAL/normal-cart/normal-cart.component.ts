import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';
import { UserServiceService } from 'src/app/services/UserService/user-service.service';
import Swal from 'sweetalert2';
import { LoginComponent } from '../../login/login.component';
import { User } from '../../models/user';

@Component({
  selector: 'app-normal-cart',
  templateUrl: './normal-cart.component.html',
  styleUrls: ['./normal-cart.component.css']
})
export class NormalCartComponent implements OnInit {

  booking = {
    bookedById: '',
    packageId: '',
    noOfSlots: 1
  }

  cartPackage = {
    id: '',
    packageName: '',
    packageId: '',
    bookedById: '',
    noOfSlots: '',
    cost: '',
    imgPath: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    slots: '',
    noOfPeoples: '',
  }

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
  
  userId: any;
  cartPackages: any[] = [{
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
    isPackageActive: false,
    isAvailable: false
  }
  ];

  public grandTotal: number = 0;

  constructor(private login: LoginServiceService, @Inject(LOCALE_ID) private locale: string, private userService: UserServiceService,
    private router: Router) { }

  ngOnInit(): void {
    this.popup = false;
    this.login.getCurrentUser(localStorage.getItem('userName')).subscribe(
      (res: any) => {
        this.user = res;
        this.userId = res.id;
        this.userId = this.user.id;
        this.getCartPackages(this.user.id);
      });
  }

  getCartPackages(id: any) {
    this.userService.getAllCartsBookingsById(id).subscribe(
      (response: any) => {
        this.cartPackages = response;
        for (let i = 0; i < response.length; i++) {
          let strtDte = formatDate(response[i].startDate, 'yyyy-MM-dd', this.locale);
          let endDte = formatDate(response[i].startDate, 'yyyy-MM-dd', this.locale);

          response[i].imgPath = "../../../assets/" + response[i].imgPath;
          response[i].startDate = strtDte;
          response[i].endDate = endDte;

          let currentDate = new Date();
          let format = formatDate(currentDate, 'yyyy-MM-dd', this.locale);

          this.cartPackages[i] = response[i];
          if (strtDte >= format) {
            this.cartPackages[i].isAvailable = true;

          }
          else {
            this.cartPackages[i].isAvailable = false;
          }

        }

        this.cartPackages.map((a: any) => {
          if (a.isPackageActive) {
            if (a.isAvailable && a.slots != 0) {
              this.grandTotal += a.totalBill;
            }
          }
        })
      },
      (error: any) => {
        console.log(error);
        console.log("error in all Packages List Fetching !!")
      }
    )
  }

  deleteFromCart(bookingId: any, totalBill: any) {
    Swal.fire({
      icon: 'question',
      title: 'Are You Certain you want to remove ?',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deletePackageCart(bookingId).subscribe(
          response => {
            Swal.fire('Successfully done !!', 'Successfuly  Removed', 'success').then((e) => {
              this.getCartPackages(this.userId);
            });
            this.grandTotal = 0;
          },
          (error: any) => { console.log(error) }
        )
      }
    })
  }

  removeAllCart() {
    this.userService.deleteAllCartPackage(this.userId).subscribe(
      (response: any) => {
        this.getCartPackages(this.userId);
        if (response.id) {
          Swal.fire('Successfully done !!', 'Successfuly  Removed', 'success').then((e) => {
            this.getCartPackages(this.userId);
          });
        }
      },
      (error: any) => { console.log(error) }
    )
  }

  toPackage() {
    this.router.navigateByUrl('normalPackages');
  }

  bookingEntity = {
    "bookedById": '',
    "packageId": '',
    "noOfSlots": 0
  }

  toPay(index: any) {
    console.log('to rozar pay')
    this.cartPackage = this.cartPackages[index];
    console.log(this.cartPackage);
    this.router.navigateByUrl('pay/' + this.cartPackage.bookedById + '/' + this.cartPackage.packageId + '/' + this.cartPackage.noOfSlots + '/' + this.cartPackage.id);
  }

  toCheckOutPay() {
    this.router.navigateByUrl('pay/' + this.user.id);
  }

  popup = false;
  quantity = 1;
  public userMsg: string | undefined;
  package: any;
  public isUserValid = false;
  public isUserInValid = false;
  totalBill: number = 0;
  bookingIdForCart: any;

  msg: string = '';

  inc(quantity: any) {
    if (this.quantity > this.package.slots) {
      this.msg = 'Slots Not Available!!  choose less slots';
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
    this.userService.calculateBill(this.quantity, this.package.id).subscribe(
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
      this.userMsg = `Only ${this.package.slots}  Slots are Available`;
    }
    else {
      this.isUserInValid = false;
      this.isUserValid = true;
      this.userMsg = `Slots Are Available`;

    }

  }

  increment(index: number) {
    if (this.cartPackages[index].noOfSlots < this.cartPackages[index].slots) {
      this.cartPackages[index].noOfSlots = this.cartPackages[index].noOfSlots + 1;
      this.cartPackages[index].totalBill = this.cartPackages[index].noOfSlots * this.cartPackages[index].cost;

      this.updateToCart(this.cartPackages[index]);
      this.grandTotal += this.cartPackages[index].cost;
    }
  }

  decrement(index: number) {
    if (this.cartPackages[index].noOfSlots != 1) {
      this.cartPackages[index].noOfSlots = this.cartPackages[index].noOfSlots - 1;
      this.cartPackages[index].totalBill = this.cartPackages[index].totalBill - this.cartPackages[index].cost;

      this.updateToCart(this.cartPackages[index]);

      this.grandTotal -= this.cartPackages[index].cost;
    }
  }

  updateToCart(cartPackage: any) {
    console.log(cartPackage);
    this.userService.updateCart(cartPackage).subscribe(
      (response: any) => {
      },
      (error: any) => {
        Swal.fire('Error', 'ERROR in Adding Slots in Package', 'error');
      }
    )
  }
} 
