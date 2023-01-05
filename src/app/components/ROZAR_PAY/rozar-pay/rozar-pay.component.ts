import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RozarPayServiceService } from 'src/app/services/ROZAR_PAY/rozar-pay-service.service';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/UserService/user-service.service';
import Swal from 'sweetalert2';
import { User } from '../../models/user';


declare var Razorpay: any;

@Component({
  selector: 'app-rozar-pay',
  templateUrl: './rozar-pay.component.html',
  styleUrls: ['./rozar-pay.component.css']
})
export class RozarPayComponent implements OnInit {

  form = {
    name: '',
    mobile: '',
    amount: 0,
    email: ''
  };
  
  cancelLink='';
  totalBill: number = 0;
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

  bookingEntity = {
    "bookedById": '',
    "packageId": '',
    "noOfSlots": 0,
    "paymentId": '',
  }


  bookingIdForCart: any;

  constructor(private http: HttpClient, private login: LoginServiceService,
    private orderService: RozarPayServiceService, private userService: UserServiceService,
    private loginService: LoginServiceService, private _router: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit() {
    this.bookingEntity.bookedById = this._router.snapshot.params['bookedById'];
    this.bookingEntity.packageId = this._router.snapshot.params['packageId'];
    this.bookingEntity.noOfSlots = this._router.snapshot.params['noOfSlots'];

    this.bookingIdForCart = this._router.snapshot.params['bookingIdForCart'];

    this.loginService.getCurrentUser(localStorage.getItem('userName')).subscribe(
      (res: any) => {
        this.user = res;
        // console.log(this.user);
        this.form.name = this.user.name;
        this.form.mobile = this.user.mobile;
        this.form.email = this.user.email;
        // console.log(this.form);
      }
    );
    
    //for direct pay from package or cart
    if (this.bookingEntity.bookedById != undefined && this.bookingEntity.packageId != undefined && this.bookingEntity.noOfSlots != undefined) {
      this.userService.calculateBill(this.bookingEntity.noOfSlots, this.bookingEntity.packageId).subscribe(
        (bill: any) => {
          this.totalBill = bill;
          // console.log(this.totalBill);
          this.cancelLink ='normalPackages';
          this.form.amount = this.totalBill;
          this.onSubmit();
        }
      )
    }
    // for checkout from cart
    else {
      this.userService.getCheckoutBill(this.bookingEntity.bookedById).subscribe(
        (grandTotalBill: any) => {
          this.cancelLink ='cart';
          this.totalBill = grandTotalBill;
          this.form.amount = this.totalBill;
          this.onSubmit();
        },
        (error: any) => {
          Swal.fire('Error !!', 'Some package slots are not available , check status below quantity', 'error').then((e) => {
            this.router.navigateByUrl('cart');
          });
        }
      )
    }
    console.log(this.cancelLink);
  }

  paymentId: string = ''
  error: string | undefined;

  options = {
    "key": "",
    "amount": "",
    "name": "Happy-Tourism",
    "description": "Web Development",
    "image": "https://cdn.vectorstock.com/i/1000x1000/94/74/happy-tourist-vector-789474.jpg",
    "order_id": "",
    "handler": function (response: any) {

      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event);
    }
    ,
    "prefill": {
      "name": "",
      "email": "",
      "contact": ""
    },
    "notes": {
      "address": ""
    },
    "theme": {
      "color": "#3399cc"
    }
  };

  onSubmit(): void {
    this.paymentId = '';
    this.error = '';
    if (this.bookingEntity.bookedById != undefined && this.bookingEntity.packageId != undefined && this.bookingEntity.noOfSlots != undefined) {
      this.userService.IsSlotsAvailable(this.bookingEntity.packageId, this.bookingEntity.noOfSlots).subscribe(
        res => {
          if (res) {
            // console.log('single pay called');
            this.payOption();
          }
          else {
            Swal.fire('Error !!', 'Required slots are not available', 'error').then((e) => {
              this.router.navigateByUrl('normalPackages');
            });
          }
        },
        error => {
          console.log(error)
        }
      )
    }
    //for checkout
    else {
      // console.log('checkout pay called');
      this.payOption()
    }
  }

  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    console.log(event.detail);
    console.log('payment success');
    this.bookingEntity.paymentId = event.detail.razorpay_payment_id;
    if (this.bookingEntity.bookedById != undefined && this.bookingEntity.packageId != undefined && this.bookingEntity.noOfSlots != undefined) {
      this.userService.storeBooking(this.bookingEntity).subscribe(
        (res: any) => {
          // for deleting package from cart after booking successfull
          if (this.bookingIdForCart != null || this.bookingIdForCart != undefined) {
            this.userService.deletePackageCart(this.bookingIdForCart).subscribe(
              response =>
                // console.log('removed from cart successfully'),
              (error: any) => { console.log(error) }
            )
          }

          Swal.fire('Successfully done !!', 'Successfuly  Booked', 'success').then((e) => {
            this.router.navigateByUrl('/normalReceipt/' + event.detail.razorpay_payment_id);
          });
        },
        (error: any) => {
          Swal.fire('Error !!', 'Unable to Book ur Package, Try Again', 'error').then((e) => {
            this.router.navigateByUrl('normalPackages');
          });
        }
      )
    }
    // for checkout
    else {
      this.userService.payCheckout(this.user.id, event.detail.razorpay_payment_id).subscribe(
        (res: any) => {
          Swal.fire('Successfully done !!', 'Successfuly checkedOut all  Packages', 'success').then((e) => {
            this.router.navigateByUrl('/normalReceipt/' + event.detail.razorpay_payment_id);
          });
        },
        (error: any) => {
          Swal.fire('Error !!', 'Unable to Book ur Package, Try Again', 'error').then((e) => {
            this.router.navigateByUrl('normalPackages');
          });
        }
      )
    }
  }


  payOption() {
    this.paymentId = '';
    this.error = '';
    this.form.name = this.user.name;
    this.form.mobile = this.user.mobile;
    this.form.email = this.user.email;
    this.form.amount = this.totalBill;

    this.orderService.createOrder(this.form).subscribe(
      data => {
        this.options.key = data.secretId;
        this.options.order_id = data.razorpayOrderId;
        this.options.amount = data.applicationFee; //paise
        this.options.prefill.name = this.user.name;
        this.options.prefill.email = this.user.email;
        this.options.prefill.contact = "";
        var rzp1 = new Razorpay(this.options);
        rzp1.open();

        rzp1.on('payment.failed', (response: any) => {
          console.log('cancelled')
          // Todo - store this information in the server
          console.log('payment failed')
          console.log(response);
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
          this.error = response.error.reason; 
        }
        );
      }
      ,
      err => {
        console.log('asdfsadfsfd')
        this.error = err.error.message;
      }
    );
  }

  cancel(){
    this.router.navigateByUrl(`${this.cancelLink}`);
  }
}
