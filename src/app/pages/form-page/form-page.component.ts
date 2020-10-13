import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PdfGeneratorService } from 'src/app/services/generator.service';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss'],
})
export class FormPageComponent implements OnInit {
  // configure the form fields
  profileForm = new FormGroup({
    firstName: new FormControl('Jon', [
      Validators.required,
      Validators.maxLength(128),
    ]),
    lastName: new FormControl('Fl', [
      Validators.required,
      Validators.maxLength(128),
    ]),
    address: new FormControl('8 rue du Port', [
      Validators.required,
      Validators.maxLength(256),
    ]),
    employer: new FormControl('Dotify', [
      Validators.required,
      Validators.maxLength(128),
    ]),
    distance: new FormControl(10000, [
      Validators.required,
      Validators.min(1),
      Validators.max(100000),
      Validators.pattern(/^[0-9]{0,6}$/),
    ]),
    days: new FormControl(123, [
      Validators.required,
      Validators.min(1),
      Validators.max(365),
      Validators.pattern(/^[0-9]{0,6}$/),
    ]),
    location: new FormControl('Paris', [
      Validators.required,
      Validators.maxLength(128),
    ]),
  });

  // shortcuts to pass the values to the child components
  get address() {
    return this.profileForm.get('address').value;
  }
  get employer() {
    return this.profileForm.get('employer').value;
  }

  constructor(private pdf: PdfGeneratorService) {}

  ngOnInit(): void {}

  onFound(key: string, value: string): void {
    this.profileForm.get(key).setValue(value);
  }

  async onSubmit() {
    this.pdf.generate(this.profileForm.value);
  }
}
