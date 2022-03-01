import { Component, OnInit } from '@angular/core';

interface Token {
  name: string
  logo: string
  address: string
}

@Component({
  selector: 'app-grotto-landing',
  templateUrl: './grotto-landing.page.html',
  styleUrls: ['./grotto-landing.page.scss'],
})
export class GrottoLandingPage implements OnInit {

  tokens: Token[] = [
    {
      name: 'CHEDDA',
      logo: '/assets/logos/chedda-logo-square.png',
      address: '0x00'
    },
    {
      name: 'USDC.c',
      logo: '/assets/logos/usd-coin-logo.png',
      address: '0x00'
    },
    {
      name: 'WAVAX.c',
      logo: '/assets/logos/avalanche-avax-logo.png',
      address: '0x00'
    }
  ]
  constructor() { }


  ngOnInit() {
  }

}
