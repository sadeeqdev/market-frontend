import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NFTCollection } from '../../models/collection.model';

@Component({
  selector: 'app-featured-collection-card',
  templateUrl: './featured-collection-card.component.html',
  styleUrls: ['./featured-collection-card.component.scss'],
})
export class FeaturedCollectionCardComponent implements OnInit {

  @Input() collection: any

  constructor(private router: Router) { }

  ngOnInit() {}


  onCollectionSelected(collection: NFTCollection) {
    console.log('collection selected: ', collection)
    this.router.navigate(['./', 'nfts', 'collection', collection.nftContract])
  }

}
