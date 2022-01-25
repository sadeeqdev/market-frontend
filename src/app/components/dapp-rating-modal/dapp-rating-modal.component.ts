import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonTextarea, ModalController } from '@ionic/angular';
import { DappExplorerService } from 'src/app/contracts/dapp-explorer.service';
import { Dapp } from 'src/app/dapps/models/dapp.model';
import { IonicRatingComponent } from 'src/app/external/ionic-rating/ionic-rating.component';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { FileUploadService, FileUploadType } from 'src/app/shared/file-upload.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';

@Component({
  selector: 'app-dapp-rating-modal',
  templateUrl: './dapp-rating-modal.component.html',
  styleUrls: ['./dapp-rating-modal.component.scss'],
})
export class DappRatingModalComponent implements OnInit {

  @Input() dapp: Dapp
  @ViewChild('ratingComponent') ratingComponent: IonicRatingComponent
  @ViewChild('textArea') textArea: IonTextarea
  addReview = false
  reviewText = ''

  constructor(
    private dappExplorer: DappExplorerService, 
    private modalController: ModalController,
    private globalAlert: GlobalAlertService,
    private fileUpload: FileUploadService,
    private wallet: WalletProviderService,
    ) { }

  ngOnInit() {}

  async cancelClicked() {
    await this.modalController.dismiss(0)
  }

  async rateDapp() {
    console.log('about to rate')
    if (this.wallet.isConnected()) {
      let rating = +this.ratingComponent.rating
      if (this.addReview) {
        console.log('adding review')
        if (this.validateReview()) {
          let response = await this.fileUpload.uploadFile(this.createPayload(), FileUploadType.Review)
          console.log('response is: ', response)
          let responseUrl = response.url
          if (responseUrl) {
            await this.dappExplorer.addReview(responseUrl, rating, this.dapp)
          }
        }
      } else {
        await this.dappExplorer.addRating(rating, this.dapp)
      }
      await this.modalController.dismiss(10)
    } else {
      this.globalAlert.presentNoConnectionAlert()
    }
  }

  validateReview() {
    return true
  }

  private createPayload() {
    let json = {
      review: this.textArea.value
    }
    return JSON.stringify(json)
  }
  onToggleValueChange($event) {
    console.log('event = ', $event)
  }

  onRatingChange($event) {}

}
