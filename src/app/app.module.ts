import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderNavBarComponent } from './components/header-nav-bar/header-nav-bar.component';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';  

import {MatListModule} from '@angular/material/list';
 

import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgxPaginationModule } from 'ngx-pagination';  
import { UserRegisterComponent } from './components/user-register/user-register.component'; 
import { AuthInterceptor } from './services/auth.interceptor';
import { LoginServiceService } from './services/LoginService/login-service.service';
import { UserServiceService } from './services/UserService/user-service.service';
import { ConfirmEqualValidatorDirective } from './Custom-Validators/confirm-equal-validator.directive'; 
import { AdminBookingsComponent } from './components/ADMIN/admin-bookings/admin-bookings/admin-bookings.component';
import { AdminPackagesComponent } from './components/ADMIN/admin-package/admin-packages/admin-packages.component';
import { AdminUsersComponent } from './components/ADMIN/admin-users/admin-users/admin-users.component';
import { NormalBookingsComponent } from './components/NORMAL/normal-bookings/normal-bookings/normal-bookings.component';
import { NormalPackagesComponent } from './components/NORMAL/normal-packages/normal-packages/normal-packages.component';
import { NormalReceiptsComponent } from './components/NORMAL/normal-receipts/normal-receipts/normal-receipts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { AdminServiceService } from './services/AdminServices/admin-service.service';
import { LocationServiceService } from './services/Location/location-service.service';
import { LocationComponent } from './components/ADMIN/location/location.component';
import { AboutpageComponent } from './components/aboutpage/aboutpage.component';
import { NormalCartComponent } from './components/NORMAL/normal-cart/normal-cart.component';
import { RozarPayComponent } from './components/ROZAR_PAY/rozar-pay/rozar-pay.component';
import { GraphasComponent } from './components/graphas/graphas.component';
 
import { SearchPipe } from './searchPipe/userSearch.pipe';
import { PackageSearchPipe } from './searchPipe/packageSearch.pipe';
import { BookingSearchPipe } from './searchPipe/bookingSearch.pip';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SideNavBarComponent,
    HeaderNavBarComponent,  
    UserRegisterComponent,
    ConfirmEqualValidatorDirective,
    AdminBookingsComponent,
    AdminPackagesComponent,
    AdminUsersComponent,
    NormalBookingsComponent,
    NormalPackagesComponent,
    NormalReceiptsComponent,
    ProfileComponent,
    ProfileUpdateComponent,
    LocationComponent,
    AboutpageComponent,
    NormalCartComponent,
    RozarPayComponent,
    GraphasComponent,

    SearchPipe,
    PackageSearchPipe,
    BookingSearchPipe,
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
MatPaginatorModule,
MatSortModule,
MatSnackBarModule,
MatInputModule,
MatSelectModule,
MatToolbarModule,
MatIconModule, 

MatListModule,

OrderModule,
FilterPipeModule,
NgxPaginationModule,
  ],
  
  providers: [     {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor,multi:true}   ,
    LoginServiceService,
    UserServiceService ,
    AdminServiceService,
    LocationServiceService,
    AdminGuardGuard     
            ],

  bootstrap: [AppComponent]
})
export class AppModule { }
