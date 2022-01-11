import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import { CheddaDappStoreService } from 'src/app/contracts/chedda-dapp-store.service';
import SwiperCore, { SwiperOptions, Navigation, Pagination, Scrollbar, } from 'swiper';
import { Dapp } from '../../models/dapp.model';
import { DappRatingModalComponent } from 'src/app/components/dapp-rating-modal/dapp-rating-modal.component';
import { DappExplorerService } from 'src/app/contracts/dapp-explorer.service';
import { IonicRatingComponent } from 'src/app/external/ionic-rating/ionic-rating.component';
import { GlobalAlertService } from 'src/app/shared/global-alert.service';
import { Subscription } from 'rxjs';
SwiperCore.use([Navigation, Pagination, Scrollbar]);

@Component({
  selector: 'app-dapp-details',
  templateUrl: './dapp-details.page.html',
  styleUrls: ['./dapp-details.page.scss'],
})
export class DappDetailsPage implements OnInit, OnDestroy, AfterContentChecked {
  reviews = []
  dapp?: Dapp
  @ViewChild('swiper') swiper: SwiperComponent
  @ViewChild('ratingComponent') ratingComponent: IonicRatingComponent
  private routeSubscription?: Subscription
  private reviewSubscription?: Subscription
  private ratingSubscription?: Subscription
  private voteSubscription?: Subscription

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
  slideOptions = {
    slidesPerView: 1.2,
    centeredSlides: false,
    loop: false,
    spaceBetween: 10,
    autoPlay: true,
    navigation: true,
  }

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private route: ActivatedRoute,
    private navController: NavController,
    private modalController: ModalController,
    private dappStoreService: CheddaDappStoreService,
    private globalAlert: GlobalAlertService,
    private dappExplorer: DappExplorerService) { 
  }

  ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(async paramMap => {
      if (!paramMap.has('address')) {
        this.navigateToDapps()
        return
      }
      this.dapp = await this.loadDapp(paramMap.get('address'))
      if (this.dapp) {
        this.loadReviews()
        this.loadRating()
        this.registerEventHandlers()
      } else {
        this.navigateToDapps()
      }
    })
  }

  ngOnDestroy(): void {
      this.routeSubscription?.unsubscribe()
      this.reviewSubscription?.unsubscribe()
      this.ratingSubscription?.unsubscribe()
      this.voteSubscription?.unsubscribe()
  }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({})
    }
  }

  async loadDapp(address: string) {
    return await this.dappStoreService.loadDappAtAddress(address)
  }

  async loadReviews() {
    // let reviews = await this.dappExplorer.loadReviews(this.dapp)
    this.reviews = await this.dappExplorer.loadReviewsWithVotes(this.dapp)
    // this.reviews = reviews
  }

  onSwiper($event) {

  }

  onSlideChange() {

  }

  onRatingChange($event) {

  }

  private navigateToDapps() {
    this.navController.navigateBack('/dapps')
  }

  async showRatingsModal() {
    const modal = await this.modalController.create({
      component: DappRatingModalComponent,
      cssClass: 'dapp-review-modal',
      showBackdrop: true,
      componentProps: {
        dapp: this.dapp
      }
    })
    modal.onDidDismiss().then(async (result) => {
      if (result && result.data) {
        await this.showConfirmAlert(result.data)
      }
    })
    await modal.present()
  }


  async loadRating() {
      const rating = await this.dappExplorer.averageRating(this.dapp)
      this.ratingComponent.rating = rating / 100
  }

  openUrl(url: string) {
    window.open(url, '_blank')
  }
  
  private async showConfirmAlert(amount) {
    await this.globalAlert.showRewardConfirmationAlert(amount)
  }

  private async registerEventHandlers() {
    this.ratingSubscription = this.dappExplorer.ratingSubject.subscribe(result => {
      if (result.contractAddress == this.dapp.contractAddress) {
        this.loadRating()
      }
    })

    this.reviewSubscription = this.dappExplorer.reviewSubject.subscribe(result => {
      if (result.contractAddress = this.dapp.contractAddress) {
        this.loadReviews()
      }
    })

    this.voteSubscription = this.dappExplorer.reviewVoteSubject.subscribe(result => {
      if (result.contractAddress == this.dapp.contractAddress) {
        this.loadReviews()
      }
    })
  }
}
