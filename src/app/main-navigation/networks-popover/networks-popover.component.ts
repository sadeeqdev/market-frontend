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
      name: 'Harmony Testnet',
      url: 'http://localhost:8100',
      icon: '/assets/logos/harmony-logo.png'
    },
    {
      name: 'Polygon Testnet',
      url: 'https://testnet-polygon.chedda.store',
      icon: '/assets/logos/polygon-logo.svg'
    },
  ]
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  onNetworkSelected(network: any) {
    this.popoverController.dismiss()
    window.open(network.url, '_self').focus()
  }
}
