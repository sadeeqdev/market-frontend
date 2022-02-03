import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSegment, NavController, ToastController } from '@ionic/angular';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { CollectionStats, NFTCollection } from '../../models/collection.model';
import { NFT } from '../../models/nft.model';
import { Clipboard } from '@angular/cdk/clipboard';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nft-collection',
  templateUrl: './nft-collection.page.html',
  styleUrls: ['./nft-collection.page.scss'],
})
export class NftCollectionPage implements OnInit, OnDestroy {

  @ViewChild('segmentControl') segmentControl: IonSegment
  collection: NFTCollection
  items: NFT[] = []
  stats: CollectionStats
  private routeSuscription?: Subscription

  currentSegment = 'items'

  constructor(
    private explorer: MarketExplorerService,
    private router: Router,
    private navController: NavController,
    private toastController: ToastController,
    private clipboard: Clipboard,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    this.routeSuscription = this.route.paramMap.subscribe(async paramMap => {
      if (!paramMap.has('contractAddress')) {
        this.navController.navigateBack('/market')
        return
      }
      try {
        const address = paramMap.get('contractAddress')
        this.collection = await this.loadCollection(address)
        this.items = await this.fetchItems(address)
      } catch (error) {
        //todo: show error before navigating back
        console.error('caught error: ', error)
        this.navController.navigateBack('/market')
      }
    })
  }

  ngOnDestroy(): void {
      this.routeSuscription?.unsubscribe()
  }

  async loadCollection(address: string) {
    return await this.explorer.loadCollection(address)
  }

  async fetchCollectionStats(address: string) {}

  async fetchItems(address: string) {
    return await this.explorer.loadCollectionItems(address)
  }

  async onSegmentChanged($event: any) {
    console.log('segment changed: ', $event)
    this.currentSegment = this.segmentControl.value
  }

  copyAddress() {
    this.clipboard.copy(this.collection.nftContract)
    this.showToast()
  }
  
  async showToast() {
    const toast = await this.toastController.create({
      message: 'Address copied',
      duration: 3000
    });
    toast.present();
  }
}
