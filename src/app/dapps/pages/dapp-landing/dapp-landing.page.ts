import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheddaDappStoreService } from 'src/app/contracts/chedda-dapp-store.service';
import { Dapp } from '../../models/dapp.model';

@Component({
  selector: 'app-dapp-landing',
  templateUrl: './dapp-landing.page.html',
  styleUrls: ['./dapp-landing.page.scss'],
})
export class DappLandingPage implements OnInit {
  dapps: Dapp[] = [];
  defiDapps: Dapp[] = []
  nftDapps: Dapp[] = []
  gamingDapps: Dapp[] = []

  constructor(
    private dappStore: CheddaDappStoreService,
    private router: Router) { }

  async ngOnInit() {
    this.loadDapps()
  }

  private async loadDapps() {
    try {
      this.dapps = await this.dappStore.getDapps()
      this.defiDapps = await this.dappStore.loadDappsInCategory('defi')
      this.nftDapps = await this.dappStore.loadDappsInCategory('nft')
      this.gamingDapps = await this.dappStore.loadDappsInCategory('gaming')
    } catch (error) {
      console.log('caught error => ', error)
    }

  }

  onSegmentChanged($event) {
    console.log($event);
  }

  onRatingChange($event) {}

  onDappSelected(dapp: Dapp) {
    this.naviagteToDapp(dapp)
  }

  naviagteToDapp(dapp: Dapp) {
    this.router.navigate(['/dapps', 'details', dapp.contractAddress])
  }
}
