import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Profile } from '../../profile.interface';
import { accountInitials } from '../../profile.utils';

@Component({
  selector: 'app-profile-popover',
  templateUrl: './profile-popover.component.html',
  styleUrls: ['./profile-popover.component.scss'],
})
export class ProfilePopoverComponent implements OnInit {

  address: string
  profile: Profile
  initials

  constructor(
    private router: Router,
    private popoverController: PopoverController
  ) { }

  ngOnInit() {
    console.log('in popover address is ', this.address)
    this.initials = accountInitials(this.address)
  }

  async navigateToProfile() {
    this.popoverController.dismiss()
    this.router.navigate(['/', 'profile', this.address])
  }
}
