import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CheddaDappStoreService } from 'src/app/contracts/chedda-dapp-store.service';
import { Dapp } from 'src/app/dapps/models/dapp.model';
import { IonicRatingComponent } from 'src/app/external/ionic-rating/ionic-rating.component';

@Component({
  selector: 'app-dapp-rating-modal',
  templateUrl: './dapp-rating-modal.component.html',
  styleUrls: ['./dapp-rating-modal.component.scss'],
})
export class DappRatingModalComponent implements OnInit {

  @Input() dapp: Dapp
  @ViewChild('ratingComponent') ratingComponent: IonicRatingComponent

  constructor(private dappExplorer: CheddaDappStoreService, private modalController: ModalController) { }

  ngOnInit() {}

  async cancelClicked() {
    await this.modalController.dismiss(0)
  }

  async rateDapp() {
    await this.modalController.dismiss(10)
  }

  onRatingChange($event) {}

}
