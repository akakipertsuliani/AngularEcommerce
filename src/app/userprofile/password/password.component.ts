import { Component } from '@angular/core';
import { UserprofileComponent } from '../userprofile.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [UserprofileComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent {
  passwordUpdateForm: FormGroup;

  constructor() {
    this.passwordUpdateForm = new FormGroup({
      NewPassword: new FormControl("", Validators.required),
      ConfrimPassword: new FormControl("", Validators.required),
    })
  }

  isValid() {
    if (this.passwordUpdateForm.valid) {
      alert("Good");
    } else {
      this.passwordUpdateForm.markAllAsTouched();
    }
  }

}
