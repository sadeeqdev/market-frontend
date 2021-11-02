import { Component, OnInit } from '@angular/core';
import { Dapp } from '../dapp.model';

@Component({
  selector: 'app-dapp-category',
  templateUrl: './dapp-category.page.html',
  styleUrls: ['./dapp-category.page.scss'],
})
export class DappCategoryPage implements OnInit {

  category: string
  dapps: Dapp[] = []
  
  constructor() { }

  ngOnInit() {
  }

}
