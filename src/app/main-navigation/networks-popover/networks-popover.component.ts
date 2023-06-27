import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EnvironmentProviderService } from 'src/app/providers/environment-provider.service';
import { VaultStatsService } from 'src/app/providers/vault-stats.service';

@Component({
  selector: 'app-networks-popover',
  templateUrl: './networks-popover.component.html',
  styleUrls: ['./networks-popover.component.scss'],
})

export class NetworksPopoverComponent implements OnInit {

  env 
  networkList = [
    // {
    //   name: 'Avalanche Testnet',
    //   url: 'https://testnet-avalanche.chedda.store',
    //   icon: '/assets/logos/avalanche-avax-logo.png'
    // },
    // {
    //   name: 'Harmony Testnet',
    //   url: 'https://testnet-harmony.chedda.store',
    //   icon: '/assets/logos/harmony-logo.png'
    // },
    {
      name: 'Oasis',
      url: 'https://testnet-oasis.chedda.store',
      icon: '/assets/logos/wrose-logo.png'
    },
    {
      name: 'Polygon',
      url: 'https://testnet-polygon.chedda.store',
      icon: '/assets/logos/matic-logo.png'
    },
    // {
    //   name: 'Telos Testnet',
    //   url: 'https://telos-hackathon.chedda.store',
    //   icon: '/assets/logos/tlos-logo.png'
    // },
  ]
  isOpenNetworkMenu: boolean;
  netWorkChangeSubscription: Subscription;
  selectedNetwork: string;

  constructor(
    private environmentService: EnvironmentProviderService,
    private vaultStatsService: VaultStatsService,
    
  ) { 
    this.env = this.environmentService.environment;
    this.selectedNetwork = this.env.config.ui.chainName
  }

  ngOnInit() {
    this.netWorkChangeSubscription = this.environmentService.environmentSubject.subscribe(async network => {
      if(network){
        this.env = network
        return
      }
    })
  }

  ngOnDestroy(){
    this.netWorkChangeSubscription?.unsubscribe;
  }

  openNetworkMenu(){
    this.isOpenNetworkMenu = !this.isOpenNetworkMenu
  }

  async onNetworkSelected(network){
    if(network.name == 'Oasis'){
      this.environmentService.changeEnvironment1();
    }else{
      this.environmentService.changeEnvironment2();
    }
    this.isOpenNetworkMenu = false;
    await this.vaultStatsService.loadVaultStats();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.network-menu-container')) {
      this.isOpenNetworkMenu = false;
    }
  }
}
