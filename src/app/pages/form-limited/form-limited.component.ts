import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AddressService } from '../../services/address.service';
import { CompanyService } from '../../services/company.service';
import { PdfGeneratorService } from '../../services/generator.service';

@Component({
  selector: 'app-form-limited',
  templateUrl: './form-limited.component.html',
  styleUrls: ['./form-limited.component.scss'],
})
export class FormLimitedComponent {
  // configure the form fields
  profileForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.maxLength(256),
    ]),
    employer: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
    ]),
    distance: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(100000),
      Validators.pattern(/^[0-9]{0,6}$/),
    ]),
    days: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(365),
      Validators.pattern(/^[0-9]{0,6}$/),
    ]),
    location: new FormControl('', [
      Validators.required,
      Validators.maxLength(128),
    ]),
  });

  constructor(
    protected addressService: AddressService,
    protected companyService: CompanyService,
    private pdf: PdfGeneratorService
  ) {}

  showError(fieldName: string, errorName: string) {
    return (
      this.profileForm.get(fieldName).dirty &&
      this.profileForm.get(fieldName).hasError(errorName)
    );
  }

  onFound(key: string, value: string): void {
    this.profileForm.get(key).setValue(value);
  }

  async onSubmit() {
    console.log(this.profileForm.value);
    this.pdf.generate(this.profileForm.value);
  }
}
