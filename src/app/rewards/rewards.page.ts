import { ApplicationRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CheddaRewardsService } from '../contracts/chedda-rewards.service';
import { ThemingService } from '../shared/theming.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {

  theme = 'light-theme'

  columns = [
    {
      name: 'Address',
      prop: 'user',
      flexGrow: 3,
    },
    {
      name: 'Points',
      prop: 'points',
      flexGrow: 1,
    },
    {
      name: 'NFT Prize',
      prop: 'rank',
      flexGrow: 1,
    }
  ]

  prizes = [
    {
      name: 'Chedda Underboss NFT',
      quantity: 1,
      image: '/assets/images/badges/svg/Underboss.svg'
    },
    {
      name: 'Chedda Consigliere NFT',
      quantity: 5,
      image: '/assets/images/badges/svg/Consigliere.svg'
    }, 
    {
      name: 'Chedda Capo NFT',
      quantity: 10,
      image: '/assets/images/badges/svg/Capo.svg'
    },
    {
      name: 'Chedda Soldier NFT',
      quantity: 20,
      image: '/assets/images/badges/svg/Soldier.svg'
    },
  ]

  leaderboard: any[]
  constructor(
    private rewardsService: CheddaRewardsService, private theming: ThemingService) { }

  async ngOnInit() {
    this.registerThemeListener()
    await this.loadLeaderboard()
  }

  async loadLeaderboard() {
    this.leaderboard = await this.rewardsService.leaderboard()
    console.log('leaderboard is ', this.leaderboard)
  }

  private registerThemeListener() {
    this.theming.theme.subscribe(theme => {
      console.log('*** theme is now ', theme)
      this.theme = theme
    })
  }


  themeChanged(theme) {
    console.log('theme changed to ', theme)
  }

}
