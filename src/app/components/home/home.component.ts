import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/app/services/LoginService/login-service.service';

interface carouselImage {
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  onclick = false;
  isclick = true;
  name1: any;

  constructor(private login: LoginServiceService, private router: Router) { }

  ngOnInit(): void {
    if (this.login.isUserLoggedIn()) {
      this.router.navigateByUrl('login');
    }
  }

  sidenavOption: any;
  isshow: boolean = true;

  menu_hide_show() {
    this.isshow = !this.isshow;
  }

  action1(name: any) {
    this.name1 = name;
    this.onclick = this.onclick;
  }
}
