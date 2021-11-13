import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BigNumber, ethers } from 'ethers';
import { CheddaMarketService } from 'src/app/contracts/chedda-market.service';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { NFTCollection } from './models/collection.model';
import { NFT } from './models/nft.model';

@Component({
  selector: 'app-nfts',
  templateUrl: './nfts.page.html',
  styleUrls: ['./nfts.page.scss'],
})
export class NftsPage {
}
