import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { MarketExplorerService } from '../contracts/market-explorer.service';
import { Profile } from './profile.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('segmentControl') 
  segmentControl: IonSegment
  profile: Profile = {
    address: '0x0000',
    username: 'JoeBlow',
    metadata: {
      avatar: 'https://gravatar.com/avatar/8d2e250e973968ddb37d8f866be200ca?s=400&d=robohash&r=x',
      about: 'JowBlow is the greatest NFT trader that ever lived',
      banner: 'https://www.primopt.com/wp-content/uploads/2018/04/Home-Four-Banner-Background-Image-1.png',
      twitterHandle: '@TheRealJoeBl0w'
    }
  }
  currentSegment = 'items'
  items = []
  initials = ''
  collectionAddress = '0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1'

  constructor(private explorer: MarketExplorerService) { }

  async ngOnInit() {
    this.initials = this.createInitials('')
    this.items = await this.fetchItems(this.collectionAddress)
  }

  copyAddress() {}

  async onSegmentChanged($event: any) {
    console.log('segment changed: ', $event)
    this.currentSegment = this.segmentControl.value
  }  
  async fetchItems(address: string) {
    return await this.explorer.loadCollectionItems(address)
  }

  private createInitials(address: string) {
    let first = ''
    let last = ''
    if (address.toLowerCase().startsWith('0x') && address.length > 2) {
      first = address[2]
    }
    if (address.length > 0) {
      last = address[address.length-1]
    }
    if (first && last) {
      return `${first}${last}`
    } else {
      return '0X'
    }
  }
}
