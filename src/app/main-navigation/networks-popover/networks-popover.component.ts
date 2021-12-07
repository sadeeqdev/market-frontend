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
      name: 'Polygon Testnet',
      url: '#',
      icon: '/assets/svg/polygon-logo.svg'
    }
  ]
  constructor(private popoverController: PopoverController) { }

  ngOnInit() {}

  onNetworkSelected(network: any) {
    this.popoverController.dismiss()
  }
}
