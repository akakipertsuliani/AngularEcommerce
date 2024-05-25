import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { OrdersComponent } from './orders/orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AddressComponent } from './address/address.component';
import { PasswordComponent } from './password/password.component';
import { AccountdetailsComponent } from './accountdetails/accountdetails.component';

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

  setActive(activeTab: string) {
    this.isOrderActive = activeTab === 'order';
    this.isWishListActive = activeTab === 'wishlist';
    this.isAddressActive = activeTab === 'address';
    this.isPasswordActive = activeTab === 'password';
    this.isAccountDetailsActive = activeTab === 'account-details';
  }
}
