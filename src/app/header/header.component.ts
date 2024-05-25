import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public isClick: boolean = false;
  public isUserDropDown: boolean = false

  dropDown() {
    this.isClick = !this.isClick;
  }

  userDropDown() {
    this.isUserDropDown = !this.isUserDropDown;
  }

  constructor(private route: Router) {}

  navigationLogin() {
    this.route.navigate(["/login"]);
    this.isClick = false;
    this.isUserDropDown = false;
  }

  navigationSingup() {
    this.route.navigate(["/singup"]);
    this.isClick = false;
    this.isUserDropDown = false;
  }

  navigationProfile() {
    this.route.navigate(["/profile"]);
    this.isClick = false;
    this.isUserDropDown = false;
  }
}
