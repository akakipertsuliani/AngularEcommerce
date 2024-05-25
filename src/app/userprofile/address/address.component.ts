import { Component } from '@angular/core';
import { UserprofileComponent } from '../userprofile.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, UserprofileComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent {
  addressForm: FormGroup;
  isAddressFormValid: boolean = false;

  constructor() {
    this.addressForm = new FormGroup({
      streetAddress: new FormControl("", Validators.required),
      City: new FormControl("", Validators.required),
      State: new FormControl("", Validators.required),
      ZipCode: new FormControl("", Validators.required),
      Country: new FormControl("", Validators.required),
    })
  }

  isValid() {
    this.isAddressFormValid = this.addressForm.valid;

    if (this.isAddressFormValid) {
      alert("Good");
    } else {
      this.addressForm.markAllAsTouched();
    }
  }
}
