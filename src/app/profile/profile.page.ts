import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonSegment, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Profile } from './profile.interface';
import { accountInitials } from './profile.utils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {
  @ViewChild('segmentControl') 
  segmentControl: IonSegment
  private routeSubscription?: Subscription
  private balanceSubscription?: Subscription
  balance: any

  // profile info to come from metadata json file
  profile: Profile = {
    address: '0x0000',
    username: 'JoeBlow',
    metadata: {
      avatar: '/assets/images/anonymous-mobster-512.png',
      about: 'JowBlow is the greatest NFT trader that ever lived',
      banner: 'https://www.primopt.com/wp-content/uploads/2018/04/Home-Four-Banner-Background-Image-1.png',
      twitterHandle: '@TheRealJoeBl0w'
    }
  }
  currentSegment = 'items'
  items = []
  initials = ''
  collectionAddress = '0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1'
  address: string

  availableBadges = [
    {
      name: 'Associate',
      imageColor: '',
      imageGrayscale: '/assets/images/badges/gray/associate-gray.png',
      rank: 1
    },

    {
      name: 'Soldier',
      imageColor: '',
      imageGrayscale: '/assets/images/badges/gray/soldier-gray.png',
      rank: 2
    },
    {
      name: 'Caporegime',
      imageColor: '',
      imageGrayscale: '/assets/images/badges/gray/capo-gray.png',
      rank: 3
    },
    {
      name: 'Consigliere',
      imageColor: '',
      imageGrayscale: '/assets/images/badges/gray/consigliere-gray.png',
      rank: 4
    },
    {
      name: 'Underboss',
      imageColor: '',
      imageGrayscale: '/assets/images/badges/gray/underboss-gray.png',
      rank: 5
    },
    {
      name: 'Boss',
      imageColor: '',
      imageGrayscale: '/assets/images/badges/gray/boss-gray.png',
      rank: 6
    },
    {
      name: 'Godfather',
      imageColor: '',
      imageGrayscale: 'assets/images/badges/gray/godfather-gray.png',
      rank: 7
    },
  ]

  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    ) { }

  async ngOnInit() {
    this.routeSubscription = this.route.paramMap.subscribe(async paramMap => {
      if (!paramMap.has('address')) {
        this.navController.navigateBack('/')
        return
      }
      try {
        this.address = paramMap.get('address')
        this.profile.address = this.address
        await this.loadProfile(this.address)
        this.initials = this.createInitials('')
      } catch (err) {
        console.error('navigation error: ', err)
        this.navController.navigateBack('/')
      }
    })
    // this.balanceSubscription = this.cheddaXP.balanceSubject.subscribe(balance => {
    //   this.balance = balance
    // })
    // this.balance = await this.cheddaXP.balanceOf(this.address)
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe()
    this.balanceSubscription?.unsubscribe()
  }

  copyAddress() {}

  async onSegmentChanged($event: any) {
    console.log('segment changed: ', $event)
    this.currentSegment = this.segmentControl.value
  }  

  private async loadProfile(address: string) {

  }

  private createInitials(address: string) {
   return accountInitials(address) 
  }
}
