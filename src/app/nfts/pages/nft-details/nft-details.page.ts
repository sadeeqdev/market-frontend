import { Component, OnInit } from '@angular/core';
import { BigNumber } from 'ethers';
import { NFT } from '../../models/nft.model';

@Component({
  selector: 'app-nft-details',
  templateUrl: './nft-details.page.html',
  styleUrls: ['./nft-details.page.scss'],
})
export class NftDetailsPage implements OnInit {

  nft: NFT | any = {
    metadata: {
      compiler: "HashLips Art Engine",
      date: 1636575897917,
      description: "Weird Geek",
      dna: "087519a6f6b62e179aa5e64828cd905f3355fd39",
      edition: 5,
      image: "https://s3.amazonaws.com/chedda.store/nfts/weird-geek/images/5.png",
      name: "#5",
      nftContract: "0x851356ae760d987E095750cCeb3bC6014560891C",
      tokenID: 141,
      tokenURI: "https://s3.amazonaws.com/chedda.store/nfts/weird-geek/metadata/5.json",
      attributes: [
        {
          "trait_type": "body",
          "value": "nerd"
        },
        {
          "trait_type": "clothing",
          "value": "white v-neck"
        },
        {
          "trait_type": "clothing logo",
          "value": "loading"
        },
        {
          "trait_type": "eyes",
          "value": "relaxed"
        },
        {
          "trait_type": "eyebrows",
          "value": "zombie"
        },
        {
          "trait_type": "mouth",
          "value": "smirk"
        },
        {
          "trait_type": "nose",
          "value": "vampire"
        },
        {
          "trait_type": "eyewear",
          "value": "clown makeup"
        },
        {
          "trait_type": "headwear",
          "value": "none"
        }
      ]
    },
  }

  constructor() { }

  ngOnInit() {
  }

}
