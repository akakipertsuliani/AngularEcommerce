import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../servise/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    BreadcrumbComponent, 
    RouterModule,
    MatProgressSpinnerModule,
    HeaderComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formGroup: FormGroup;
  isTrue: boolean = true;
  isTrueLogIn: boolean = false;

  constructor(private auth: AuthService, private route: Router) {
    this.formGroup = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    })
  }

  isValidForm() {
    let isValid = this.formGroup.valid;

    if (isValid) {
      const email = this.formGroup.get('email')?.value;
      const password = this.formGroup.get('password')?.value;
      this.isTrue = false;

      this.auth.logInUser(email, password).subscribe({
        next: () => {
          this.route.navigate(["/product"]);
          this.isTrue = true;
          this.isTrueLogIn = false;
        },
        error: () => {
          this.isTrue = true;
          this.isTrueLogIn = true;
          isValid = false;
        }
      })
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
