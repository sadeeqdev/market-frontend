import { Injectable } from '@angular/core';
import { EnvironmentProviderService } from '../providers/environment-provider.service';
import { GlobalAlertService } from './global-alert.service';

@Injectable({
  providedIn: 'root',
})
export class ButtonService {
  constructor(
    private environmentService: EnvironmentProviderService,
    private alert: GlobalAlertService
  ) {}

  async handleTransactionButton(clickedCallback: void) {
    let eth: any = window.ethereum;
    if (eth) {
      let chainId = await eth.request({
        method: 'eth_chainId',
      });
      let currentNetwork =
        this.environmentService.environment.config.networkParams.chainId.toLocaleLowerCase();
      if (chainId === currentNetwork) {
        clickedCallback;
      } else {
        this.alert.showSwitchAlert();
      }
    } else {
      this.alert.presentNoConnectionAlert();
    }
  }
}
