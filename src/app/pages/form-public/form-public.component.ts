import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CounterService } from '../../services/counter.service';
import { AddressService } from '../../services/address.service';
import { CompanyService } from '../../services/company.service';
import { PdfPublicGeneratorService } from '../../services/pdfPublic.service';

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
    name: new FormControl('', [Validators.required, Validators.maxLength(51)]),
    ministry: new FormControl('', [
      Validators.required,
      Validators.maxLength(120),
    ]),
    rank: new FormControl('', [Validators.required, Validators.maxLength(51)]),
    year: new FormControl(this.currentYear, [Validators.required]),
    mobility: new FormControl('no', [Validators.required]),
    mobility_date: new FormControl(''),
    days: new FormControl('', [
      Validators.max(365),
      Validators.pattern(/^[0-9]{0,6}$/),
    ]),
    home_address: new FormControl('', [
      Validators.required,
      Validators.maxLength(256),
    ]),
    work_address: new FormControl('', [
      Validators.required,
      Validators.maxLength(256),
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
    private pdf: PdfPublicGeneratorService,
    private counter: CounterService
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
      } else {
        document.querySelectorAll('[id*="checkbox_"]').forEach((box) => {
          // @ts-ignore
          box.checked = true;
          (this.profileForm.get('chk') as FormArray).push(
            new FormControl(box.getAttribute('id'))
          );
        });

        // save to localStorage
        localStorage.setItem(
          'formPublic',
          JSON.stringify(this.profileForm.value)
        );
      }
    } catch (e) {
      localStorage.removeItem('formPublic');
    }

    // auto-save
    this.profileForm.valueChanges
      .pipe(debounceTime(250), distinctUntilChanged())
      .subscribe((o: object) => {
        localStorage.setItem('formPublic', JSON.stringify(o));
      });

    // set mobility_date required stated
    this.profileForm.get('mobility').valueChanges.subscribe((value) => {
      if (value === 'no') {
        this.profileForm.get('mobility_date').clearValidators();
      } else {
        this.profileForm
          .get('mobility_date')
          .setValidators(Validators.required);
      }
      this.profileForm.get('mobility_date').updateValueAndValidity();
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
    this.pdf.generate(this.profileForm.value, {
      onComplete: () => alert('Attestation générée'),
    });
    this.counter.save(window.origin, 'public');
  }

  trackByFn(index, item) {
    return item.id;
  }
}
