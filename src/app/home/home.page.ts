import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  connected = false
  isDark = false;

  constructor() {}

  // toggleDarkTheme(prefersDark.matches);

  // // Listen for changes to the prefers-color-scheme media query
  // prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

  // Add or remove the "dark" class based on if the media query matches
  toggleDarkTheme(shouldAdd: boolean) {
    this.isDark = !this.isDark;
    if (shouldAdd) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }
}
