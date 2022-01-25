import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-collection',
  templateUrl: './create-collection.page.html',
  styleUrls: ['./create-collection.page.scss'],
})
export class CreateCollectionPage implements OnInit {

  categories = [
    'Art',
    'Photography',
    'Sports',
    'Utility',
    'Other',
  ]
  constructor() { }

  ngOnInit() {
  }

}
