import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../servise/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    BreadcrumbComponent, 
    RouterModule,
    MatProgressSpinnerModule,
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
      Email: new FormControl("", [Validators.required, Validators.email]),
      Password: new FormControl("", Validators.required),
    })
  }

  isValidForm() {
    let isValid = this.formGroup.valid;

    if (isValid) {
      const formValue = this.formGroup.getRawValue();
      this.isTrue = false;

      this.auth.logInUser(formValue.Email, formValue.Password).subscribe({
        next: () => {
          this.route.navigate(["/profile"]);
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

    this.auth.logInUser('', '').subscribe().unsubscribe();
  }
}
