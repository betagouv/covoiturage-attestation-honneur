import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';
import { AddressService } from '../../services/address.service';
import { CompanyService } from '../../services/company.service';
import { PdfGeneratorService } from '../../services/generator.service';

@Component({
  selector: 'app-form-public',
  templateUrl: './form-public.component.html',
  styleUrls: ['./form-public.component.scss'],
})
export class FormPublicComponent implements OnInit {
  // configure the form fields
  currentYear: number = new Date().getFullYear();
  previousYear: number = new Date().getFullYear() - 1;

  profileForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    year: new FormControl(this.currentYear, [Validators.required]),
    days: new FormControl('', [
      Validators.max(365),
      Validators.pattern(/^[0-9]{0,6}$/),
    ]),
    chk: new FormArray(
      [],
      [
        Validators.required,
        // validate array length
        (c: AbstractControl): { [key: string]: any } =>
          c.value.length === 11 ? null : { arrayLength: true },
      ]
    ),
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

  ngOnInit(): void {
    // reload saved data in a crash free way
    try {
      const saved = localStorage.getItem('formPublic');
      if (saved) {
        const obj = JSON.parse(saved);
        this.profileForm.patchValue(obj);
        obj.chk.forEach((id: string) => {
          (this.profileForm.get('chk') as FormArray).push(new FormControl(id));
          // @ts-ignore
          document.getElementById(id).checked = true;
        });
      }
    } catch (e) {
      localStorage.removeItem('formPublic');
    }

    // auto-save
    this.profileForm.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        filter((o: object) => !!Object.values(o).filter((v) => !!v).length)
      )
      .subscribe((o: object) => {
        localStorage.setItem('formPublic', JSON.stringify(o));
      });
  }

  showError(fieldName: string, errorName: string) {
    return (
      this.profileForm.get(fieldName).dirty &&
      this.profileForm.get(fieldName).hasError(errorName)
    );
  }

  onChkChange(event): void {
    const fa = this.profileForm.get('chk') as FormArray;
    if (event.target.checked) {
      fa.push(new FormControl(event.target.value));
    } else {
      let idx = 0;
      fa.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value === event.target.value) {
          fa.removeAt(idx);
          return;
        }
        idx += 1;
      });
    }
  }

  onFound(key: string, value: string): void {
    this.profileForm.get(key).setValue(value);
  }

  onReset(): void {
    localStorage.removeItem('formPublic');
  }

  async onSubmit() {
    console.log(this.profileForm.value);
    // this.pdf.generate(this.profileForm.value);
  }

  trackByFn(index, item) {
    return item.id;
  }
}
