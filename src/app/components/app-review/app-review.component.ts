import { Component, Input, OnInit } from '@angular/core';
import { DappExplorerService, Review } from 'src/app/contracts/dapp-explorer.service';
import { Dapp } from 'src/app/dapps/models/dapp.model';

@Component({
  selector: 'dapp-review',
  templateUrl: './app-review.component.html',
  styleUrls: ['./app-review.component.scss'],
})
export class DappReviewComponent implements OnInit {

  @Input() review: any
  @Input() dapp: Dapp

  constructor(private explorer: DappExplorerService) { }

  ngOnInit() {}

  async onThumbUp() {
    await this.explorer.voteOnReview(this.dapp, this.review.id.toString(), 1)
  }

  async onThumbDown() {
    await this.explorer.voteOnReview(this.dapp, this.review.id.toString(), -1)
  }

}
