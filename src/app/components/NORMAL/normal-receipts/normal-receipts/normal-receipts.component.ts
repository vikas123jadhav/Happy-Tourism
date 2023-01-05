import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';
import { UserServiceService } from 'src/app/services/UserService/user-service.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/components/models/user';

@Component({
  selector: 'app-normal-receipts',
  templateUrl: './normal-receipts.component.html',
  styleUrls: ['./normal-receipts.component.css']
})
export class NormalReceiptsComponent implements OnInit {
  user: User = {
    id: 0,
    userName: '',
    name: '',
    mobile: '',
    email: '',
    isActive: false,
    createdOn: new Date(),
    role: '',
    age: 0,
  }
  paymentId: any;
  NotFound = '';
  bookings: any;
  currentDate: any;
  totalBill = 0;
  showReceipt = false;

  searchOpt = true;

  constructor(private loginService: LoginServiceService, @Inject(LOCALE_ID) private locale: string,
    private UserService: UserServiceService, private _router: ActivatedRoute) { }

  ngOnInit(): void {
    this.paymentId = this._router.snapshot.params['paymentId'];
    this.loginService.getCurrentUser(localStorage.getItem('userName')).subscribe(
      (res: any) => {
        this.user = res;
        this.currentDate = formatDate(new Date(), 'dd-MM-yyyy', this.locale);
        if (this.paymentId != undefined || this.paymentId != null) {
          this.searchOpt = false;
          this.getReceipt();
        }
      });
  }

  getReceipt() {
    this.UserService.getReceipt(this.paymentId, this.user.id).subscribe(
      (res: any) => {
        this.totalBill = 0;
        this.bookings = res;
        for (let i = 0; i < res.length; i++) {
          let strtDte = formatDate(res[i].startDate, 'yyyy-MM-dd', this.locale);
          res[i].startDate = strtDte;
          this.totalBill = this.totalBill + res[i].totalBill;
        }
        console.log('booking');
        console.log(res);
        this.NotFound = '';
        this.showReceipt = true;
      },
      (error: any) => {
        console.log('error := ');
        console.log(error);
        this.showReceipt = false;
        this.bookings = [];
        this.NotFound = "Incorrect Payment Id , Check Once";
      }

    )
  }

  public makepdf(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Happy-Tourism_' + this.user.name + '.pdf');
    });
  }

}
