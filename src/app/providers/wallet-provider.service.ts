import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WalletProviderService {

  constructor() { }

  isConected(): boolean {
    return false;
  }

  connect(networkId: string) {

  }

  addNetwork(params) {}
}
