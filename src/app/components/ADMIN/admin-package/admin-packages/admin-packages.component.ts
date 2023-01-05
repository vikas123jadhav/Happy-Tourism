import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Package } from 'src/app/components/models/package';
import { noSpecialCharacter } from 'src/app/Custom-Validators/noSpecialCharacter.validator';
import { AdminServiceService } from 'src/app/services/AdminServices/admin-service.service';
import { LocationServiceService } from 'src/app/services/Location/location-service.service';
import { SuccessErrorOpenService } from 'src/app/services/SuccErrorOpen/success-error-open.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-packages',
  templateUrl: './admin-packages.component.html',
  styleUrls: ['./admin-packages.component.css']
})
export class AdminPackagesComponent implements OnInit {

  input='';
  localUrl: any[] = [];

  package: Package = {
    id: 0,
    packageName: '',
    cost: 0,
    imgPath: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    slots: 0,
    noOfPeoples: 0,
    isActive:false,
    storedDate: '',
   updatedDate:'',
   isAvailable: false
  }

  packages :Package[]= [{
    id: 0,
    packageName: '',
    cost: 0,
    imgPath: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    slots: 0,
    noOfPeoples: 0,
    isActive: false,
   storedDate:'',
   updatedDate:'',
   isAvailable: false
  }]

  searchInput: any = { packageName: '' }

  imgPath: any;
  locations: any;
  enablePackageList = true;
  enablePackageAdd = false;
  enableAddIcon = true;

  constructor(@Inject(LOCALE_ID) private locale: string, private locationService: LocationServiceService, private adminService: AdminServiceService, private snack: MatSnackBar,
    private sucErr: SuccessErrorOpenService) { }

  ngOnInit(): void {
    this.getAllLocations();
    this.getAllPackages();
  }

  getAllPackages() {
    this.adminService.getAllPackages().subscribe(
      (response: any) => {
        this.packages = response;
        for (let i = 0; i < response.length; i++) {
          let strtDte = formatDate(response[i].startDate, 'yyyy-MM-dd', this.locale);
          let endDte = formatDate(response[i].startDate, 'yyyy-MM-dd', this.locale);

          response[i].imgPath = '../../../assets/' + response[i].imgPath;
          response[i].startDate = strtDte;
          response[i].endDate = endDte;
   
        
        let currentDate = new Date();
        let format = formatDate(currentDate, 'yyyy-MM-dd', this.locale);

        this.packages[i] = response[i];
        if (strtDte >= format) {
          this.packages[i].isAvailable = true;

        }
        else {
          this.packages[i].isAvailable = false;
        }
      }

        this.package = response;
      },
      (error: any) => {
        console.log(error);
        console.log('error in all Packages List Fetching !!')
      }
    )
  }

  getAllLocations() {
    this.locationService.getAllLocations().subscribe(
      data => {
        this.locations = data;
      }
    )
  }

  enablePackageAdding() {
    this.enablePackageAdd = true;
    this.enablePackageList = false;
    this.enableAddIcon = false;
  }

  cancelAdding() {
    this.enablePackageAdd = false;
    this.enablePackageList = true;
    this.enableAddIcon = true;
  }
  public userFile: any = File;
  onUploadFile(event: any) {
    const file = event.target.files[0];

    this.userFile = file;
    console.log(event.target.files[0].type);
    if (event.target.files[0].type == 'image/jpeg' || event.target.files[0].type == 'image/png')
      console.log('valid file')
    else {
      Swal.fire('Error', 'Invalid Image Format', 'error').then((e) => {
        event.target.value = null;
      })
    }
  }


  packageSubmit() {
    const formData = new FormData();
    formData.append('file', this.userFile);

    let currentDate = new Date();
    let format = formatDate(currentDate, 'yyyy-MM-dd', this.locale);

    if (this.package.startDate >= format.toString()) {
      if (this.package.endDate < this.package.startDate) {
        Swal.fire('Error !!', 'EndDate should be greater than  StartDate', 'error').then((e) => {
          this.package.endDate = '';
        });
      }
      else {
        this.adminService.addPackage(this.package.packageName, this.package.cost, this.package.imgPath, this.package.location, this.package.startDate, this.package.endDate
          , this.package.description, this.package.slots, this.package.noOfPeoples, formData).subscribe(
            response => {
              Swal.fire('Successfully done !!', 'Successfuly  Submitted', 'success').then((e) => {
                window.location.reload();
              });
            },
            error => {
              Swal.fire('Error', 'ERROR in File Upload', 'error');
              console.log(error);
            }
          )
      }
    }
    else {
      Swal.fire('Error !!', 'Start Date   :-Dont choose the old dates.', 'error').then((e) => {
        this.package.startDate = '';
      });
    }
  }

  packageUpdate() {
    const formData = new FormData();
    formData.append('file', this.userFile);

    let currentDate = new Date();
    let format = formatDate(currentDate, 'yyyy-MM-dd', this.locale);

    if (this.package.endDate < this.package.startDate) {
      Swal.fire('Error !!', 'EndDate should be greater than  StartDate', 'error').then((e) => {
        this.package.endDate = '';
      });
    }
    else {
      this.adminService.updatePackage(this.package.id, this.package.packageName, this.package.cost, this.package.imgPath, this.package.location, this.package.startDate, this.package.endDate
        , this.package.description, this.package.slots, this.package.noOfPeoples, formData).subscribe(
          response => {
            Swal.fire('Successfully done !!', 'Successfuly  Submitted', 'success').then((e) => {
              this.cancelAdding();
            });
          },
          error => {
            Swal.fire('Error', 'ERROR in Package Updating', 'error');
            console.log(error);
          }
        )
    }
  }

  deleteById(id: number) {
    Swal.fire({
      icon: 'question',
      title: 'Are You Certain you want to delete ?',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //console.log(id, role);
        this.adminService.deletePackageById(id).subscribe(
          deletedResult => {
            if (deletedResult) {
              Swal.fire('Successfully done !!', 'Successfuly  Deleted', 'success').then((e) => {
                this.getAllPackages();
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

  add = true;
  update = false;

  editPackageById(id: number) {
    this.enablePackageAdding();
    this.add = false;
    this.update = true;

    this.adminService.getPackageById(id).subscribe(
      (response: any) => {
        let strtDte = formatDate(response.startDate, 'yyyy-MM-dd', this.locale);
        let endDte = formatDate(response.startDate, 'yyyy-MM-dd', this.locale);
        response.startDate = strtDte;
        response.endDate = endDte;

        this.package = response;
      },
      (error: any) => {
        console.log(error);
        console.log("error in  Packages List Fetching !!")
      }
    )
  }

  activatePackage(id: number) {
    Swal.fire({
      icon: 'question',
      title: 'Are Sure, you want to Re-activate this Package ?',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.reActivatePackage(id).subscribe(
          deletedResult => {
            if (deletedResult) {
              Swal.fire('Successfully done !!', 'Successfuly  Activated', 'success').then((e) => {
                this.getAllPackages();
              });
            }
            else {
              this.snack.open('Not Found !!', 'Enable to Re-Active', {
                duration: 5000,
              })
            }
          },
          error => {
            console.log("error in Deleting Account");
            this.snack.open('Something Went wrong !!', 'Enable to Re-Activate', {
              duration: 5000,
            })
          }
        )
      }
    })
  }
  get PackageName() {
    return this.registerform.get("PACKAGENAME") as FormControl;
  }
  get Cost() {
    return this.registerform.get("COST") as FormControl;
  }
  get ImgPath() {
    return this.registerform.get("IMGPATH") as FormControl;
  }
  get Location() {
    return this.registerform.get("LOCATION") as FormControl;
  }
  get StartDate() {
    return this.registerform.get("STARTDATE") as FormControl;
  }
  get EndDate() {
    return this.registerform.get("ENDDATE") as FormControl;
  }
  get Description() {
    return this.registerform.get("DESCRIPTION") as FormControl;
  }
  get Slots() {
    return this.registerform.get("SLOTS") as FormControl;
  }
  get NoOfPeoples() {
    return this.registerform.get("PEOPLECOUNTS") as FormControl;
  }

  registerform = new FormGroup({
    PACKAGENAME: new FormControl("", [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern("[a-zA-Z].*"),
      noSpecialCharacter.noSpecialChar
    ]),

    COST: new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9]*")
    ]),

    SLOTS: new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9]*")
    ]),

    PEOPLECOUNTS: new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9]*")
    ]),

    DESCRIPTION: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(150),

    ]),

    LOCATION: new FormControl("", [Validators.required]),
    IMGPATH: new FormControl("", [Validators.required]),
    STARTDATE: new FormControl("", [Validators.required]),
    ENDDATE: new FormControl("", [Validators.required]),
  })
}
