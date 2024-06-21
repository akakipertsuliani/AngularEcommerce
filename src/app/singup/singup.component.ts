import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../servise/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { format } from 'date-fns';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    BreadcrumbComponent, 
    RouterModule,
    MatProgressSpinnerModule,
    HeaderComponent
  ],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss'
})
export class SingupComponent {
  formGroup: FormGroup;
  isTrue: boolean = true;
  somethingWrong: boolean = false;

  constructor(private route: Router, private auth: AuthService, private firestore: AngularFirestore){
    this.formGroup = new FormGroup({
      Name: new FormControl("", Validators.required),
      Email: new FormControl("", [Validators.required, Validators.email]),
      Password: new FormControl("", Validators.required),
    })
  }
  
  isValidForm() {
    const isValid = this.formGroup.valid;
    
    if (isValid) {
      const formValue = this.formGroup.getRawValue();
      this.isTrue = false;

      this.auth.regiseter(formValue.Email, formValue.Name, formValue.Password).subscribe({
        next: () => { 
          const username = this.formGroup.get('Name')?.value;
          const email = this.formGroup.get('Email')?.value;

          const registrationTime = new Date();
          const formattedRegistrationTime = format(registrationTime, 'dd-MM-yyyy - HH:mm:ss');

          this.firestore.collection("users").add({
            _0id: this.firestore.createId(),
            _1username: username,
            _2email: email,
            _3registrationTime: formattedRegistrationTime,
          }).then(() => {
            this.route.navigate(["/profile"]);
            this.isTrue = true;
          }).catch(() => {
            this.isTrue = true;
            this.somethingWrong = true;
          });
        },
        error: () => {
          this.isTrue = true;
          this.somethingWrong = true;
        }
      })
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}

export interface UserProfile {
  username: string;
}
