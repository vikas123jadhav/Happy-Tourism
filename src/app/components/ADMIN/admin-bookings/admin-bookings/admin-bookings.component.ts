import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminServiceService } from 'src/app/services/AdminServices/admin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessErrorOpenService } from 'src/app/services/SuccErrorOpen/success-error-open.service';

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css']
})
export class AdminBookingsComponent implements OnInit {

  bookings = [{
    id: '',
    bookedById: '',
    noOfSlots: '',
    type: '',
    totalBill: '',
    bookedDate: '',
    updatedDate: ''
  }]

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
  searchInput: any = { bookedById: '', bookedDate: '', noOfSlots: '', }
  constructor(private userService: AdminServiceService, private snack: MatSnackBar, private sucErr: SuccessErrorOpenService) {

  }

  ngOnInit(): void {
    this.getBookings();
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

  getBookings() {
    this.userService.getAllBookings().subscribe(
      (response: any) => {
        this.bookings = response;
      },
      (error: any) => {
        console.log(error);
        console.log('error in all Booking List Fetching !!');
      }
    )
  }
}
