import { Observable } from 'rxjs';
import {
  switchMap,
  tap,
  filter,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { SearchInterface } from '../services/search.interface';

@Component({ selector: 'app-search-field', template: '' })
export abstract class SearchFieldComponent implements OnInit {
  @Input() val: string;
  @Output() found = new EventEmitter();

  formCtl = new FormControl('', [
    Validators.required,
    Validators.maxLength(256),
  ]);

  options: Observable<string[]>;
  loading: boolean = false;

  protected service: SearchInterface;

  ngOnInit(): void {
    if (this.val) this.formCtl.setValue(this.val);

    this.options = this.formCtl.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      filter((v) => !!v.trim().length),
      tap(() => (this.loading = true)),
      switchMap((s: string) => this.service.search(s)),
      tap((v) => {
        this.loading = false;
        this.found.emit(this.formCtl.value);
      })
    );
  }
}
