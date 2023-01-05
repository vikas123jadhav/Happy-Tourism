import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { AboutpageComponent } from './components/aboutpage/aboutpage.component'; 
import { AdminBookingsComponent } from './components/ADMIN/admin-bookings/admin-bookings/admin-bookings.component';
import { AdminPackagesComponent } from './components/ADMIN/admin-package/admin-packages/admin-packages.component';
import { AdminUsersComponent } from './components/ADMIN/admin-users/admin-users/admin-users.component';
import { LocationComponent } from './components/ADMIN/location/location.component';
import { GraphasComponent } from './components/graphas/graphas.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';  
import { NormalBookingsComponent } from './components/NORMAL/normal-bookings/normal-bookings/normal-bookings.component';
import { NormalCartComponent } from './components/NORMAL/normal-cart/normal-cart.component';
import { NormalPackagesComponent } from './components/NORMAL/normal-packages/normal-packages/normal-packages.component';
import { NormalReceiptsComponent } from './components/NORMAL/normal-receipts/normal-receipts/normal-receipts.component';
import { ProfileUpdateComponent } from './components/profile-update/profile-update.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RozarPayComponent } from './components/ROZAR_PAY/rozar-pay/rozar-pay.component';
import { SideNavBarComponent } from './components/side-nav-bar/side-nav-bar.component';
import { UserRegisterComponent } from './components/user-register/user-register.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { NormalGuardGuard } from './guards/normal-guard.guard';

const routes: Routes = [

  { path:'home', component:HomeComponent, pathMatch:'full' },
  { path:'',  redirectTo:'home', pathMatch:'full' },
  { path:'home', component:HomeComponent, pathMatch:'full' },
  { path:'login', component:LoginComponent, pathMatch:'full' },
    
  { path:'registerUser', component:UserRegisterComponent, pathMatch:'full' },
  
  { path:'profile', component:ProfileComponent, pathMatch:'full' },
  { path:'profile/updateProfile',   component : ProfileUpdateComponent, pathMatch:'full' ,  },
 
  { path:'about',   component : AboutpageComponent, pathMatch:'full'},
  { path:'sidenav',   component : SideNavBarComponent, pathMatch:'full' },

  { path:'graphs',   component : GraphasComponent, pathMatch:'full',  },

  
// ================================================= ADMIN =======================================
{ path:'adminBookings', component:AdminBookingsComponent, pathMatch:'full', canActivate:[AdminGuardGuard ]  },
{ path:'adminPackages', component:AdminPackagesComponent, pathMatch:'full', canActivate:[AdminGuardGuard ]  },
{ path:'adminUsers', component:AdminUsersComponent, pathMatch:'full', canActivate:[AdminGuardGuard ] },
{ path:'location', component:LocationComponent, pathMatch:'full', canActivate:[AdminGuardGuard ] },

// ================================================= USER =======================================
{ path:'normalBookings', component:NormalBookingsComponent, pathMatch:'full', canActivate:[NormalGuardGuard ]  },
{ path:'normalPackages', component:NormalPackagesComponent, pathMatch:'full', canActivate:[NormalGuardGuard ]  },
{ path:'normalReceipt', component:NormalReceiptsComponent, pathMatch:'full', canActivate:[NormalGuardGuard ] },
{ path:'normalReceipt/:paymentId', component:NormalReceiptsComponent, pathMatch:'full', canActivate:[NormalGuardGuard ] },

{ path:'cart', component:NormalCartComponent, pathMatch:'full', canActivate:[NormalGuardGuard ] },

// ================================================= ROZAR PAY =======================================
{ path:'pay/:bookedById/:packageId/:noOfSlots', component:RozarPayComponent, pathMatch:'full'},   // direct payment from package list
{ path:'pay/:bookedById/:packageId/:noOfSlots/:bookingIdForCart' , component:RozarPayComponent, pathMatch:'full'},  // payment for cart package
{ path:'pay/:bookedById', component:RozarPayComponent, pathMatch:'full'}  // for checkout
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
