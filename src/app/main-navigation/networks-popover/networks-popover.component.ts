import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalController, NavController } from '@ionic/angular';
import { LoadingModalComponent } from 'src/app/shared/components/loading-modal/loading-modal.component';
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
  loader: any;

  constructor(
    private environmentService: EnvironmentProviderService,
    private vaultStatsService: VaultStatsService,
    private modalController: ModalController,
  ) { 
    this.env = this.environmentService.environment;
    this.selectedNetwork = this.env.config.ui.chainName
  }

  ngOnInit() {
    this.listenToEvents();
  }

  ngOnDestroy(){
    this.netWorkChangeSubscription?.unsubscribe;
  }

  openNetworkMenu(){
    this.isOpenNetworkMenu = !this.isOpenNetworkMenu
  }

  async onNetworkSelected(network){
    this.showLoading("Changing network");
    this.environmentService.changeEnvironment(network);
    this.vaultStatsService.loadVaultStats();
    this.isOpenNetworkMenu = false;
    setTimeout(() => {
      this.hideLoading();
    },2000)
  }

  private async showLoading(message: string) {
    this.loader = await this.modalController.create({
      component: LoadingModalComponent,
      componentProps:{
        'message': message
      }
    })
    return await this.loader?.present()
  }

  private async hideLoading() {
    await this.loader?.dismiss();
  }

  private async listenToEvents(){
    this.netWorkChangeSubscription = this.environmentService.environmentSubject.subscribe(async network => {
      if(network){
        this.env = network
      }

    })
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.network-menu-container')) {
      this.isOpenNetworkMenu = false;
    }
  }
}
