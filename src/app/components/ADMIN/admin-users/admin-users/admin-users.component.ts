import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminServiceService } from 'src/app/services/AdminServices/admin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessErrorOpenService } from 'src/app/services/SuccErrorOpen/success-error-open.service';
import { User } from 'src/app/components/models/user';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  input='';
  users:User[]= [];
  userName: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20, 25]


  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sortt!: MatSort;

  orderHeader: String = '';
  isDescOrder: boolean = true;
  searchInput: any = { name: '', userName: '', mobile: '', age: '' }
 
  constructor(private userService: AdminServiceService, private snack: MatSnackBar, private sucErr: SuccessErrorOpenService,@Inject(LOCALE_ID) private locale: string) {
    this.userName = localStorage.getItem('userName');
  }

  ngOnInit(): void {
    this.getUsers();
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

  getUsers() {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        this.users = response;
        for (let i = 0; i < response.length; i++) {
          let createdOn = formatDate(response[i].createdOn, 'yyyy-MM-dd', this.locale);
          response[i].createdOn = createdOn;
        }
        this.users = response;
      },
      (error: any) => {
        console.log(error);
        console.log('error in User List Fetching !!')
      }
    )
  }

  deleteById(id: number) {
    Swal.fire({
      icon: 'question',
      title: 'Are You Certain you want to delete ?',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserById(id).subscribe(
          deletedResult => {
            if (deletedResult) {
              Swal.fire('Successfully done !!', 'Successfuly  Deleted', 'success').then((e) => {
                this.getUsers();
              });
            }
            else {
              this.snack.open('Not Found !!', 'Enable to Delete', {
                duration: 5000,
              })
            }
          },
          error => {
            console.log('error in Deleting Account');
            this.snack.open('Something Went wrong !!', 'Enable to Delete', {
              duration: 5000,
            })
          }
        )
      }
    })
  }

  activateUser(id: number) {
    Swal.fire({
      icon: 'question',
      title: 'Are Sure, you want to Re-activate this User ?',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.reActivateUser(id).subscribe(
          deletedResult => {
            if (deletedResult) {
              Swal.fire('Successfully done !!', 'Successfuly  Activated', 'success').then((e) => {
                this.getUsers();
              });
            }
            else {
              this.snack.open('Not Found !!', 'Enable to Delete', {
                duration: 5000,
              })
            }
          },
          error => {
            console.log('error in Deleting Account');
            this.snack.open('Something Went wrong !!', 'Enable to Re-Activate', {
              duration: 5000,
            })
          }
        )
      }
    })
  }
}
