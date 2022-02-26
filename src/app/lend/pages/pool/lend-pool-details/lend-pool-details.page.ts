import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lend-pool-details',
  templateUrl: './lend-pool-details.page.html',
  styleUrls: ['./lend-pool-details.page.scss'],
})
export class LendPoolDetailsPage implements OnInit {

  collaterals = [
    {
      name: 'AVAX',
      logo: '/assets/logos/avalanche-avax-logo.png'
    },
    {
      name: 'WGK',
      logo: '/assets/logos/wgk-logo.png'
    },
    {
      name: 'EYE',
      logo: '/assets/logos/eye-logo.png'
    },
  ]
  currentSegment = 'deposit'
  constructor() { }

  ngOnInit() {
  }

  onSegmentChanged($event) {
    this.currentSegment = $event.target.value
  }
}
