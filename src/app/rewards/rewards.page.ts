import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.page.html',
  styleUrls: ['./rewards.page.scss'],
})
export class RewardsPage implements OnInit {

  columns = [
    {
      name: 'Address',
      prop: 'address',
      flexGrow: 3,
    },
    {
      name: 'Points',
      prop: 'points',
      flexGrow: 1,
    },
    {
      name: 'NFT Prize',
      prop: 'prize',
      flexGrow: 1,
    }
  ]


  prizes = [
    {
      name: 'Chedda Underboss NFT',
      quantity: 1,
      image: '/assets/images/chedda-circle-gold.png'
    },
    {
      name: 'Chedda Consigliere NFT',
      quantity: 3,
      image: 'assets/images/chedda-circle-silver.png'
    }, 
    {
      name: 'Chedda Capo NFT',
      quantity: 5,
      image: 'assets/images/chedda-circle-white.png'
    },
    {
      name: 'Chedda Soldier NFT',
      quantity: 10,
      image: 'assets/images/chedda-circle-white.png'
    },
  ]

  constructor() { }

  ngOnInit() {
  }


  users = [
    {
      address: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
      points: '1271',
      prize: 'nft1'
    },
    {
      address: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      points: '993',
      prize: 'nft2'
    },
    {
      address: '0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc',
      points: '700',
      prize: 'nft2'
    },
    {
      address: '0x90f79bf6eb2c4f870365e785982e1f101e93b906',
      points: '220',
      prize: 'nft2'
    },
    {
      address: '0x15d34aaf54267db7d7c367839aaf71a00a2c6a65',
      points: '200',
      prize: 'nft3'
    },
    {
      address: '0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc',
      points: '175',
      prize: 'nft3'
    },
    {
      address: '0x976ea74026e726554db657fa54763abd0c3a0aa9',
      points: '155',
      prize: 'nft3'
    },
    {
      address: '0x14dc79964da2c08b23698b3d3cc7ca32193d9955',
      points: '155',
      prize: 'nft3'
    },
    {
      address: '0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f',
      points: '125',
      prize: 'nft3'
    },
    {
      address: '0xa0ee7a142d267c1f36714e4a8f75612f20a79720',
      points: '125',
      prize: 'nft3'
    },
    {
      address: '0xbcd4042de499d14e55001ccbb24a551f3b954096',
      points: '125',
      prize: 'nft3'
    },
    {
      address: '0x71be63f3384f5fb98995898a86b02fb2426c5788',
      points: '125',
      prize: 'nft3'
    },
    {
      address: '0xfabb0ac9d68b0b445fb7357272ff202c5651694a',
      points: '125',
      prize: 'nft3'
    },
     
  ]
}
