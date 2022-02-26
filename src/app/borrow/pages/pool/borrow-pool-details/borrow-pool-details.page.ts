import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-borrow-pool-details',
  templateUrl: './borrow-pool-details.page.html',
  styleUrls: ['./borrow-pool-details.page.scss'],
})
export class BorrowPoolDetailsPage implements OnInit {

  currentSegment = 'collateral'
  collateralType = ''
  collaterals = [

  ]
  selectedNfts = []
  myNftsCollateral = []

  constructor() { }

  ngOnInit() {
  }

  onSegmentChanged($event) {
    this.currentSegment = $event.target.value
  }

  onCollateralTypeChanged($event) {
    this.collateralType = $event.target.value
  }
}
