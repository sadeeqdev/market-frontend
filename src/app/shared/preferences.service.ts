import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

enum PreferenceKeys {
  colorTheme = 'colorTheme',
  welcomeModalShown = 'welcomeModalShown'
}

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor(private storage: LocalStorageService) { }

  public get colorTheme() : string {
    return this.storage.get(PreferenceKeys.colorTheme)
  }

  public set colorTheme(v : string) {
    this.storage.set(PreferenceKeys.colorTheme, v)
  }

  public get welcomeModalShown(): boolean {
    return this.storage.get(PreferenceKeys.welcomeModalShown)
  }

  public set welcomeModalShown(value: boolean) {
    this.storage.set(PreferenceKeys.welcomeModalShown, value)
  }
}
