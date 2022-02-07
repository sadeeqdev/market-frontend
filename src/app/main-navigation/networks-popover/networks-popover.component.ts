import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-networks-popover',
  templateUrl: './networks-popover.component.html',
  styleUrls: ['./networks-popover.component.scss'],
})
export class NetworksPopoverComponent implements OnInit {

  networkList = [
    {
      name: 'Avalanche Testnet',
      url: 'https://testnet-avalanche.chedda.store',
      icon: '/assets/logos/avalanche-avax-logo.png'
    },
    {
      name: 'Polygon Testnet',
      url: 'https://testnet-polygon.chedda.store',
      icon: '/assets/logos/polygon-logo.svg'
    },
    {
      name: 'Harmony Testnet',
      url: 'https://testnet-harmony.chedda.store',
      icon: '/assets/logos/harmony-logo.png'
    },

  ]
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  onNetworkSelected(network: any) {
    this.popoverController.dismiss()
    window.open(network.url, '_self').focus()
  }
}
