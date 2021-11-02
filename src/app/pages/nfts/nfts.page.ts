import { Component, OnInit } from '@angular/core';
import { NFT } from './nft.model';

@Component({
  selector: 'app-nfts',
  templateUrl: './nfts.page.html',
  styleUrls: ['./nfts.page.scss'],
})
export class NftsPage implements OnInit {

  nfts: NFT[] = [

  ]

  constructor() { }

  ngOnInit() {
  }

  onNFTSelected(nft: NFT) {}

}
