import { HttpClient } from '@angular/common/http';
import { AfterContentChecked, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController, NavController, ToastController } from '@ionic/angular';
import { SwiperComponent } from 'swiper/angular';
import { CheddaDappStoreService } from 'src/app/contracts/chedda-dapp-store.service';
import SwiperCore, { SwiperOptions, Navigation, Pagination, Scrollbar, } from 'swiper';
import { Dapp } from '../../models/dapp.model';
import { DappRatingModalComponent } from 'src/app/components/dapp-rating-modal/dapp-rating-modal.component';
SwiperCore.use([Navigation, Pagination, Scrollbar]);

@Component({
  selector: 'app-dapp-details',
  templateUrl: './dapp-details.page.html',
  styleUrls: ['./dapp-details.page.scss'],
})
export class DappDetailsPage implements OnInit, AfterContentChecked {
  reviews = []
  dapp?: Dapp
  @ViewChild('swiper') swiper: SwiperComponent

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
    private toastController: ToastController,
    private dappStoreService: CheddaDappStoreService) { 
  }

  ngOnInit() {
    this.route.paramMap.subscribe(async paramMap => {
      if (!paramMap.has('address')) {
        this.navigateToDapps()
        return
      }
      this.dapp = await this.loadDapp(paramMap.get('address'))
      console.log('dapp is ', this.dapp)
      if (this.dapp) {
        this.loadReviews()
      } else {
        this.navigateToDapps()
      }
    })
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
    this.http.get('https://devdactic.fra1.digitaloceanspaces.com/twitter-ui/tweets.json').subscribe((data: any) => {
      this.reviews = data.tweets;
    });
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
      cssClass: 'stack-modal',
      showBackdrop: true,
      componentProps: {
        dapp: this.dapp
      }
    })
    modal.onDidDismiss().then((result) => {
      console.log('amount is ', result)
      if (result && result.data) {
        this.showToast(result.data)
      }
    })
    await modal.present()
  }

  private async showToast(amount) {
    const toast =  await this.toastController.create({
      header: 'Chedda XP earned',
      message: `You just earned ${amount} XP`,
      position: 'bottom',
      duration: 5000
    })

    await toast.present()
  }
}
