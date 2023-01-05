import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminServiceService } from 'src/app/services/AdminServices/admin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessErrorOpenService } from 'src/app/services/SuccErrorOpen/success-error-open.service';
import { UserServiceService } from 'src/app/services/UserService/user-service.service';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';
import { User } from 'src/app/components/models/user';

@Component({
  selector: 'app-normal-bookings',
  templateUrl: './normal-bookings.component.html',
  styleUrls: ['./normal-bookings.component.css']
})
export class NormalBookingsComponent implements OnInit {

  bookings = [{
    id: '',
    bookedById: '',
    noOfSlots: '',
    type: '',
    totalBill: '',
    bookedDate: '',
    updatedDate: ''
  }]

  showUserBookings = false;
  showUserCart = false;
  input='';
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20, 25]

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sortt!: MatSort;

  orderHeader: String = '';
  isDescOrder: boolean = true;
  searchInput: any = { packageName: '', paymentId: '', totalBill: '' }
  constructor(private userService: UserServiceService, private snack: MatSnackBar, private sucErr: SuccessErrorOpenService,
    private login: LoginServiceService) {
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

  ngOnInit(): void {
    this.login.getCurrentUser(localStorage.getItem('userName')).subscribe(
      (res: any) => {
        this.user = res;
        this.getBookings(this.user.id)
      });
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  sort(headerName: String) {
    this.isDescOrder = !this.isDescOrder;
    this.orderHeader = headerName;
  }

  // for pagination
  onTableDataChange(event: any) {
    this.page = event;
  }

  onTableSizeChange(event: any) {
    this.tableSize = event.target.value;
    this.page = 1;
  }

  getBookings(id: number) {
    this.userService.getAllPurchasedBookingsById(id).subscribe(
      (response: any) => {
        this.bookings = response;
      },
      (error: any) => {
        console.log(error);
        console.log("error in all Booking List Fetching !!")
      }
    )
  }

  getCarts(id: number) {
    this.userService.getAllCartsBookingsById(id).subscribe(
      (response: any) => {
        this.bookings = response;
      },
      (error: any) => {
        console.log(error);
        console.log("error in all Cart Booking List Fetching !!")
      }
    )
  }
}
