import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CheddaXpService } from 'src/app/contracts/chedda-xp.service';
import { DropManagerService } from 'src/app/contracts/drop-manager.service';
import { WalletProviderService } from 'src/app/providers/wallet-provider.service';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { DropEntryCheddaXpComponent } from '../components/drop-entry-chedda-xp/drop-entry-chedda-xp.component';
import { Drop, DropType } from '../drop.model';

@Component({
  selector: 'app-drop-details',
  templateUrl: './drop-details.page.html',
  styleUrls: ['./drop-details.page.scss'],
})
export class DropDetailsPage implements OnInit, OnDestroy {

  drop: Drop
  private routeSubscription?: Subscription

  constructor(
    private modalController: ModalController,
    private globalAlert: GlobalAlertService,
    private wallet: WalletProviderService,
    private navController: NavController,
    private dropManager: DropManagerService,
    private cheddaXP: CheddaXpService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(async paramMap => {
      if (!paramMap.has('id')) {
        this.navigateToDrops()
        return
      }
      this.drop = await this.dropManager.getDrop(paramMap.get('id'))
      if (this.drop) {
        // load drop details
      } else {
        this.navigateToDrops()
      }
    })
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe()
  }

  async onEnterClicked() {
    if (this.wallet.isConnected) {
      const currentAccount = this.wallet.currentAccount
      if (currentAccount) {
        let balance = await this.cheddaXP.balanceOf(currentAccount)
        console.log('balance = ', balance)
        if (!balance.isZero()) {
          this.showEnterModal() 
          return
        }
      }
      this.globalAlert.showNoCheddaXPAlert()
    } else {
      this.globalAlert.presentNoConnectionAlert()
    }
  }
  async showEnterModal() {
    const modal = await this.modalController.create({
      component: DropEntryCheddaXpComponent,
      componentProps: {
        drop: this.drop
      }
    })
    await modal.present()
  }

  private navigateToDrops() {
    this.navController.back()
  }
}
