import { Component, HostListener, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-networks-popover',
  templateUrl: './networks-popover.component.html',
  styleUrls: ['./networks-popover.component.scss'],
})
export class NetworksPopoverComponent implements OnInit {
  env = environment

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
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  openNetworkMenu(){
    this.isOpenNetworkMenu = !this.isOpenNetworkMenu
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!(event.target as HTMLElement).closest('.network-menu-container')) {
      this.isOpenNetworkMenu = false;
    }
  }
}
