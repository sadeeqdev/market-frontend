import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dapp } from '../../models/dapp.model';

@Component({
  selector: 'app-featured-dapp',
  templateUrl: './featured-dapp.component.html',
  styleUrls: ['./featured-dapp.component.scss'],
})
export class FeaturedDappComponent implements OnInit {
  @Input() dapp: Dapp

  constructor(private router: Router) { }

  ngOnInit() {}


  onDappSelected(dapp: Dapp) {
    this.naviagteToDapp(dapp)
  }

  naviagteToDapp(dapp: Dapp) {
    this.router.navigate(['/dapps', 'details', dapp.contractAddress])
  }
}
