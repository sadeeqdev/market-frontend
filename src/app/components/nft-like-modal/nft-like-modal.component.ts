import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MarketExplorerService } from 'src/app/contracts/market-explorer.service';
import { NFT } from 'src/app/nfts/models/nft.model';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';

@Component({
  selector: 'app-nft-like-modal',
  templateUrl: './nft-like-modal.component.html',
  styleUrls: ['./nft-like-modal.component.scss'],
})
export class NftLikeModalComponent implements OnInit {

  nft: NFT

  userChoice

  constructor(
    private modalController: ModalController,
    private wallet: WalletProviderService,
    private marketExplorer: MarketExplorerService,
    private globalAlert: GlobalAlertService,
  ) { }

  ngOnInit() {}

  onLike() {
    this.userChoice = 'like'
  }

  onDislike() {
    this.userChoice = 'dislike'
  }

  async cancelClicked() {
    await this.modalController.dismiss(0)
  }

  async submitClicked() {
    if (this.wallet.isConnected() && this.userChoice) {
      let result
      if (this.userChoice == 'like') {
        result = await this.marketExplorer.likeItem(this.nft.nftContract, this.nft.tokenID)
      } else {
        result = await this.marketExplorer.dislikeItem(this.nft.nftContract, this.nft.tokenID)
      }
      await this.modalController.dismiss(10)
    } else {
      this.globalAlert.presentNoConnectionAlert()
    }
  }
}
