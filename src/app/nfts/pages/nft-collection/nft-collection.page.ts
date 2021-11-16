import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSegment, NavController, ToastController } from '@ionic/angular';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { CollectionStats, NFTCollection } from '../../models/collection.model';
import { NFT } from '../../models/nft.model';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-nft-collection',
  templateUrl: './nft-collection.page.html',
  styleUrls: ['./nft-collection.page.scss'],
})
export class NftCollectionPage implements OnInit {

  @ViewChild('segmentControl') segmentControl: IonSegment
  collection: NFTCollection
  items: NFT[] = []
  stats: CollectionStats

  currentSegment = 'items'

  constructor(
    private explorer: MarketExplorerService,
    private router: Router,
    private navController: NavController,
    private toastController: ToastController,
    private clipboard: Clipboard,
    private route: ActivatedRoute) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(async paramMap => {
      if (!paramMap.has('contractAddress')) {
        this.navController.navigateBack('/nfts')
        return
      }
      try {
        const address = paramMap.get('contractAddress')
        this.collection = await this.loadCollection(address)
        this.items = await this.fetchItems(address)
        console.log('collection is ', this.collection)
        console.log('items are: ', this.items)
      } catch (error) {
        //todo: show error before navigating back
        this.navController.navigateBack('/nfts')
      }
    })
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
