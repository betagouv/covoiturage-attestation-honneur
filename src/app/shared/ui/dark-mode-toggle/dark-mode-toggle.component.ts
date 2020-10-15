import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

type Scheme = 'dark' | 'light';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
})
export class DarkModeToggleComponent implements OnInit {
  toggle = new FormControl();

  private scheme: Scheme = 'light';

  constructor() {}

  ngOnInit(): void {
    // fetch the user value from localStorage
    // or fallback to browser preferences. Defaults to light
    this.scheme = (localStorage.getItem('scheme') ||
    window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light') as Scheme;

    this.apply(this.scheme);
    this.toggle.setValue(this.scheme === 'dark', { emitEvent: false });

    this.toggle.valueChanges.subscribe((isDark) => {
      this.apply(isDark ? 'dark' : 'light');
    });
  }

  private apply(scheme) {
    localStorage.setItem('scheme', scheme);
    document.documentElement.setAttribute('data-theme', scheme);
  }
}
