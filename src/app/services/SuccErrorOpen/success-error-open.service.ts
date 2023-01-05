import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SuccessErrorOpenService {

  constructor(private snack: MatSnackBar, private router: Router) { }

  public swalSuccessFire(role: any) {
    Swal.fire('Successfully done !!', role + ' is registered', 'success').then((e) => {
      if (role == 'Admin' || role == 'Faculty')
        this.router.navigateByUrl('adminDashboard');
      else
        this.router.navigateByUrl('login');
    });
  }


  public snackErrorOpen() {
    // alert('someting went wrong');
    this.snack.open('Something Went wrong !!', 'UserName Already Exist, Try with Different', {
      duration: 5000,
    })
  }


}
