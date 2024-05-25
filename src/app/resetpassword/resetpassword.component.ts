import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BreadcrumbComponent],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      Email: new FormControl("", [Validators.required, Validators.email]),
      Password: new FormControl("", Validators.required),
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
}
