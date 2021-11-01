import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CheddaDappStoreService } from 'src/app/contracts/chedda-dapp-store.service';
import SwiperCore, { SwiperOptions, Navigation, Pagination, Scrollbar, } from 'swiper';
import { Dapp } from '../dapp.model';
SwiperCore.use([Navigation, Pagination, Scrollbar]);

@Component({
  selector: 'app-dapp-details',
  templateUrl: './dapp-details.page.html',
  styleUrls: ['./dapp-details.page.scss'],
})
export class DappDetailsPage implements OnInit {
  reviews = []
  dapp?: Dapp

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 50,
    navigation: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
  constructor(
    private http: HttpClient, 
    private router: Router, 
    private route: ActivatedRoute,
    private navController: NavController,
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

}
