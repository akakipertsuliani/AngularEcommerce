import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MainserviceService } from '../../servise/mainservice.service';

@Component({
  selector: 'app-accountdetails',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './accountdetails.component.html',
  styleUrl: './accountdetails.component.scss'
})
export class AccountdetailsComponent {
  userDetailsForm: FormGroup;
  userAccontName: string = "";
  userAccontEmail: string = "";

  constructor(private mainService: MainserviceService) {
    this.userDetailsForm = new FormGroup({
      FullName: new FormControl("", Validators.required),
      Email: new FormControl("", Validators.required),
    })
  }

  isValid() {
    if (this.userDetailsForm.valid) {
      alert("Good");
    } else {
      this.userDetailsForm.markAllAsTouched();
    }
  }
}
