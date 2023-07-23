import { Injectable } from '@angular/core';
import { Wallet } from 'ethers';
import { EnvironmentProviderService } from '../providers/environment-provider.service';
import { WalletProviderService } from '../providers/wallet-provider.service';
import { GlobalAlertService } from './global-alert.service';

@Injectable({
  providedIn: 'root',
})
export class ButtonService {
  constructor(
    private environmentService: EnvironmentProviderService,
    private alert: GlobalAlertService,
    private wallet: WalletProviderService
  ) {}

  async handleTransactionButton(clickedCallback: () => void) {
    if (window.ethereum) {
      let chainId = await this.wallet.getChainId();
      let currentNetwork = this.environmentService.environment.config.networkParams.chainId.toLocaleLowerCase();
      
      if (chainId === currentNetwork) {
        clickedCallback();
      } else {
        this.alert.showSwitchAlert(); 
      }
    } else {
      this.alert.presentNoConnectionAlert();
    }
  }
}
