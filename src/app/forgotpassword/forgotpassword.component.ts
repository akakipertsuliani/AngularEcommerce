import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BreadcrumbComponent],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      Email: new FormControl("", [Validators.required, Validators.email]),
    })
  }

  isValidForm() {
    const isValid = this.formGroup.valid;

    if (isValid) {
      alert("Good");
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  title = "Forgot password";
}
