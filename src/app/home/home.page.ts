import { Component } from '@angular/core';
import { CheddaDappStoreService } from '../contracts/chedda-dapp-store.service';
import { DefaultProviderService } from '../providers/default-provider.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  connected = false
  isDark = false;

  constructor(private provider: DefaultProviderService, private dappStore: CheddaDappStoreService) {}

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
    this.isDappStore()
  }

  onConnectTapped() {
    this.provider.getBlockNumber();
  }

  async isDappStore() {
    console.log('is isCheddaStore = ', await this.dappStore.isCheddaStore());
  }
}
