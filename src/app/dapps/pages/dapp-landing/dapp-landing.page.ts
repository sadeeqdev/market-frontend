import { ApplicationRef, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSelect } from '@ionic/angular';
import { CheddaDappStoreService } from 'src/app/contracts/chedda-dapp-store.service';
import { Dapp } from '../../models/dapp.model';

@Component({
  selector: 'app-dapp-landing',
  templateUrl: './dapp-landing.page.html',
  styleUrls: ['./dapp-landing.page.scss'],
})
export class DappLandingPage implements OnInit {

  @ViewChild('filterSelect') filterSelect: IonSelect

  featuredDapps: Dapp[] = []
  dapps: Dapp[] = [];
  defiDapps: Dapp[] = []
  nftDapps: Dapp[] = []
  gamingDapps: Dapp[] = []

  constructor(
    private dappStore: CheddaDappStoreService,
    private ref: ApplicationRef,
    private router: Router) { }

  async ngOnInit() {
    this.loadDapps()
  }

  private async loadDapps() {
    try {
      this.featuredDapps = await this.dappStore.loadFeaturedDapps()
      this.loadAll()
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

  dropdownValueChanged($event: any) {
    console.log('dropdown value changed: ', this.filterSelect.value)
    if (!this.filterSelect.value) {
      return
    }
    try {
      switch (this.filterSelect.value) {
        case 'all':
          this.loadAll()
        case 'popular':
          this.loadPopular()
          break
        case 'new':
          this.loadNew()
          break
        default:
          this.loadCategory(this.filterSelect.value)
      }
    } catch (error) {
      console.log('error loading dapps for category: ', this.filterSelect.value, error)
    }
  }

  private async loadAll() {
    this.dapps = await this.dappStore.loadDapps()
  }
  private async loadPopular() {
    this.dapps = await this.dappStore.loadPopularDapps()
  }

  private async loadNew() {
    this.dapps = await this.dappStore.loadNewDapps()
  }

  private async loadCategory(category: string) {
    this.dapps = await this.dappStore.loadDappsInCategory(category)
  }
}
