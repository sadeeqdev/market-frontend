import { Component, OnInit } from '@angular/core';
import { DappService } from '../dapp.service';

@Component({
  selector: 'app-dapps',
  templateUrl: './dapps.page.html',
  styleUrls: ['./dapps.page.scss'],
})
export class DappsPage implements OnInit {

  dapps: any[];

  constructor(private dappService: DappService) { }

  ngOnInit() {
    this.dapps = this.dappService.loadDapps();
  }

  onSegmentChanged($event) {
    console.log($event);
  }
}
