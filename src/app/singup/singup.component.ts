import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../servise/auth.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [
    ReactiveFormsModule, 
    CommonModule, 
    BreadcrumbComponent, 
    RouterModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.scss'
})
export class SingupComponent {
  formGroup: FormGroup;
  isTrue: boolean = true;

  constructor(private route: Router, private auth: AuthService){
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
          this.route.navigate(["/profile"]);
          this.isTrue = true;
        },
        error: () => {
          this.isTrue = true;
        }
      })
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

}
