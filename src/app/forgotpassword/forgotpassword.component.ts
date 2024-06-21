import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Auth } from '@angular/fire/auth';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

@Component({
    selector: 'app-forgotpassword',
    standalone: true,
    imports: [
      ReactiveFormsModule, 
      CommonModule, 
      BreadcrumbComponent,
      MatProgressSpinnerModule,
    ],
    templateUrl: './forgotpassword.component.html',
    styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent {
    formGroup: FormGroup;
    isTrue: boolean = true;
    isDone: string = '0';

    constructor(private auth: Auth) {
        this.formGroup = new FormGroup({
            Email: new FormControl('', [Validators.required, Validators.email]),
        });
    }

    isValidForm() {
        const isValid = this.formGroup.valid;
        const authA = getAuth();

        if (isValid) {
          this.isTrue = false;

          sendPasswordResetEmail(this.auth, this.formGroup.get('Email')!.value).then(() => {
            this.isTrue = true;
            this.isDone = '1';

            setTimeout(() => {
              this.isDone = '0';
            }, 1500);
          }).catch(() => {
            this.isTrue = true;
            this.isDone = '2';

            setTimeout(() => {
              this.isDone = '0';
            }, 1500);
          })
        } else {
            this.formGroup.markAllAsTouched();
        }
    }
}
