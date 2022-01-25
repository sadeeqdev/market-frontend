import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.page.html',
  styleUrls: ['./create-item.page.scss'],
})
export class CreateItemPage implements OnInit {

  collections = [
    'My Fancy Collection',
    'Other Collection'
  ]
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  onCollectionItemSelected() {
    this.navigateToCreateCollection()
  }

  navigateToCreateCollection() {
    this.router.navigate(['/nfts', 'create', 'collection'])
  }

}
