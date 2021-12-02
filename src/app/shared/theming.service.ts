import { ApplicationRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {
  themes = ["dark-theme", "light-theme"]; // <- list all themes in this array
  theme = new BehaviorSubject("light-theme"); // <- initial theme
  colorSchemeQueryList = window.matchMedia('(prefers-color-scheme: dark)')

  constructor(private ref: ApplicationRef) {
    // this.registerListener()
    this.registerColorSchemeListener()
    this.registerThemeListener()
  }
o

  registerThemeListener() {
    // Initially check if dark mode is enabled on system
    console.log('registering theme listener')
    const darkModeOn =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    // If dark mode is enabled then directly switch to the dark-theme
    if (darkModeOn) {
      this.theme.next("dark-theme");
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      const newColorScheme = e.matches ? "dark" : "light";
      console.log('mic check 1 2')
  });

    // Watch for changes of the preference
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', e => {
      const turnOn = e.matches;
      console.log('theme changed to ', e)
      this.theme.next(turnOn ? "dark-theme" : "light-theme");

      // Trigger refresh of UI
      this.ref.tick();
    });
  }

  registerColorSchemeListener() {
    console.log('registering color scheme listener')

    this.setColorScheme(this.colorSchemeQueryList);
    this.colorSchemeQueryList.addEventListener('change', this.setColorScheme)
  }

  setColorScheme(e) {
    if (e.matches) {
      // Dark
      console.log('Dark mode')
    } else {
      // Light
      console.log('Light mode')
    }
    this.ref.tick()
  }
}
