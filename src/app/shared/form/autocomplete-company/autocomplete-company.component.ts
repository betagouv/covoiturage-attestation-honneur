import {
  tap,
  debounceTime,
  distinctUntilChanged,
  filter,
  switchMap,
} from 'rxjs/operators';
import {
  OnInit,
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostListener,
  ViewChild,
  ElementRef,
  forwardRef,
} from '@angular/core';
import {
  Validator,
  FormControl,
  ControlValueAccessor,
  AbstractControl,
  ValidationErrors,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
} from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-autocomplete-company',
  templateUrl: './autocomplete-company.component.html',
  styleUrls: ['./autocomplete-company.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteCompanyFormComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AutocompleteCompanyFormComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteCompanyFormComponent
  implements OnInit, ControlValueAccessor, Validator {
  @ViewChild('autocomplete', { static: true }) autocomplete: ElementRef<any>;

  items: Array<string> = [];
  search = new FormControl();
  open = false;
  disabled = false;
  loading = false;

  constructor(
    private service: CompanyService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.search.valueChanges
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        filter((v) => v.trim().length > 1),
        tap(() => {
          this.loading = true;
          this.ref.markForCheck();
        }),
        switchMap((s: string) => this.service.search(s))
      )
      .subscribe((items) => {
        this.items = items;
        this.open = true;
        this.loading = false;
        this.ref.markForCheck();
      });
  }

  private onChange = (_: string) => {};
  private onTouch = () => {};

  // hide the dropdown when clicks anywhere else
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this.autocomplete.nativeElement.contains(
      targetElement
    );
    if (!clickedInside) {
      this.closeDropdown();
      this.onTouch();
    }
  }

  @HostListener('blur')
  public onTouched() {
    this.closeDropdown();
    this.onTouch();
  }

  writeValue(val: string): void {
    this.search.setValue(val, { emitEvent: false });
    this.onChange(val); // update the parent model
    this.onTouch();
    this.closeDropdown();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onItemClick(item: string) {
    if (!this.disabled) {
      this.writeValue(item);
    }
  }

  toggleDropdown() {
    if (!this.disabled) {
      this.open = !this.open;
    }
  }

  closeDropdown() {
    this.open = false;
  }

  validate(c: AbstractControl): ValidationErrors | null {
    return c.errors;
  }
}
