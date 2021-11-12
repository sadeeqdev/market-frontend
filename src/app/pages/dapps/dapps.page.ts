import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CheddaDappStoreService } from 'src/app/contracts/chedda-dapp-store.service';
import { DappService } from '../dapp.service';
import { Dapp } from './dapp.model';

@Component({
  selector: 'app-dapps',
  templateUrl: './dapps.page.html',
  styleUrls: ['./dapps.page.scss'],
})
export class DappsPage implements OnInit {

  dapps: Dapp[] = [];
  defiDapps: Dapp[] = []
  nftDapps: Dapp[] = []
  gamingDapps: Dapp[] = []

  constructor(
    private dappService: DappService, 
    private dappStore: CheddaDappStoreService,
    private router: Router) { }

  async ngOnInit() {
    this.loadDapps()
  }

  private async loadDapps() {
    try {
      // this.dapps = await this.dappStore.getDapps()
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
