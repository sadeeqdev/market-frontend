import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dapp-review',
  templateUrl: './app-review.component.html',
  styleUrls: ['./app-review.component.scss'],
})
export class DappReviewComponent implements OnInit {

  @Input() review: any

  constructor() { }

  ngOnInit() {}

}
