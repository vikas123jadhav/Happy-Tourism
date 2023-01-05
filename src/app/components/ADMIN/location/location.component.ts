import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminServiceService } from 'src/app/services/AdminServices/admin-service.service';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessErrorOpenService } from 'src/app/services/SuccErrorOpen/success-error-open.service';
import { LocationServiceService } from 'src/app/services/Location/location-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { noSpecialCharacter } from 'src/app/Custom-Validators/noSpecialCharacter.validator';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  locations = [
    {
      id: '',
      location: ''
    }];

  location = {
    location: ''
  }

  locationList = true;
  enableAddIcon = true;
  enableAddLocation = false;

  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20, 25]

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sortt!: MatSort;

  orderHeader: String = '';
  isDescOrder: boolean = true;
  searchInput: any = { location: '' }
  constructor(private locationService: LocationServiceService, private snack: MatSnackBar, private sucErr: SuccessErrorOpenService) {

  }

  ngOnInit(): void {
    this.getLocations();
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

  getLocations() {
    this.locationService.getAllLocations().subscribe(
      (response: any) => {
        this.locations = response;
      },
      (error: any) => {
        console.log(error);
        console.log("error in Locations List Fetching !!")
      }
    )
  }

  deleteLocationById(locationId: number) {
    Swal.fire({
      icon: 'question',
      title: 'Are You Certain you want to delete ?',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.locationService.deleteLocation(locationId).subscribe(
          deletedResult => {
            if (deletedResult) {
              Swal.fire('Successfully done !!', 'Successfuly  Deleted', 'success').then((e) => {
                this.getLocations();
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

  enableLocationAdding() {
    this.enableAddIcon = false;
    this.locationList = false;
    this.enableAddLocation = true;
    this.getLocations();
  }

  cancelAdding() {
    this.enableAddIcon = true;
    this.locationList = true;
    this.enableAddLocation = false;
  }

  registerLocation = new FormGroup({
    LOCATION: new FormControl('', [
      Validators.required,
      // Validators.minLength(5),                           
      Validators.pattern('[a-zA-Z].*'),
      noSpecialCharacter.noSpecialChar
    ])
  })

  get Location() {
    return this.registerLocation.get('LOCATION') as FormControl;
  }

  addLocation() {
    this.locationService.saveLocation(this.location).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire('Successfully Added !!', 'Successfuly  Added', 'success').then((e) => {
          this.enableLocationAdding();
          this.location.location = ''
        });
      },
      (error) => {
        console.log(error);
        this.snack.open('', 'Location Already Available, Try with Different', {
          duration: 5000,
        })
        this.enableLocationAdding();
        this.location.location = '';
      }
    );
  }


  public isLocationValid = false;
  public isLocationInValid = false;
  public userMsg: string | undefined;

  public VerifyUserOnKeyUP() {
    if (this.location.location.length < 4) {
      this.isLocationInValid = true;
      this.isLocationValid = false;
      this.userMsg = 'User Name too short..'
    }
    else {
      for (var item of this.locations) {
        if (item.location.toLocaleLowerCase() == this.location.location.toLocaleLowerCase()) {
          this.isLocationInValid = true;
          this.isLocationValid = false;
          this.userMsg = 'Location Already Availabe - try another';
          break;
        }
        else {
          this.isLocationInValid = false;
          this.isLocationValid = true;
          this.userMsg = 'Location is Available'
        }
      }
    }
  }
}
