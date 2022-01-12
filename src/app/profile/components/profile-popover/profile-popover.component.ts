import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { CheddaXpService } from 'src/app/contracts/chedda-xp.service';
import { Profile } from '../../profile.interface';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})
export class ProfilePopoverComponent implements OnInit {

  address: string
  profile: Profile
  balance = 0

  constructor(
    private router: Router,
    private cheddaXP: CheddaXpService,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.checkBalance()
  }

  private async checkBalance() {
    if (this.address) {
      this.balance = await this.cheddaXP.balanceOf(this.address)
    }
  }

  async navigateToProfile() {
    this.popoverController.dismiss()
    this.router.navigate(['/', 'profile', this.address])
  }
}
