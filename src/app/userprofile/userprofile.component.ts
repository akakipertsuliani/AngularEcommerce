import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { OrdersComponent } from './orders/orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AddressComponent } from './address/address.component';
import { PasswordComponent } from './password/password.component';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLinkActive,
    RouterModule,
    CommonModule,
    BreadcrumbComponent,
    OrdersComponent,
    WishlistComponent,
    AddressComponent,
    PasswordComponent,
    AccountdetailsComponent,
    HeaderComponent
  ],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss',
})

export class UserprofileComponent {
  isOrderActive: boolean = true;
  isWishListActive: boolean = false;
  isAddressActive: boolean = false;
  isPasswordActive: boolean = false;
  isAccountDetailsActive: boolean = false;

  constructor(private auth: AngularFireAuth, private route: Router) {}

  setActive(activeTab: string) {
    this.isOrderActive = activeTab === 'order';
    this.isWishListActive = activeTab === 'wishlist';
    this.isAddressActive = activeTab === 'address';
    this.isPasswordActive = activeTab === 'password';
    this.isAccountDetailsActive = activeTab === 'account-details';
  }

  userLogout() {
    this.auth.signOut().then(() => {
      localStorage.clear();
      this.route.navigate(['/']);
    });
  }
}
