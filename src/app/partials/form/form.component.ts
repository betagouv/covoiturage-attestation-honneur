import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PdfGeneratorService } from 'src/app/services/generator.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
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

  constructor(private pdf: PdfGeneratorService) {}

  ngOnInit(): void {}

  onFound(key: string, value: string): void {
    this.profileForm.get(key).setValue(value);
  }

  async onSubmit() {
    console.log(this.profileForm.value);
    this.pdf.generate(this.profileForm.value);
  }
}
