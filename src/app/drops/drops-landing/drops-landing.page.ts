import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DropManagerService } from 'src/app/contracts/drop-manager.service';
import { Drop, DropType } from '../drop.model';

@Component({
  selector: 'app-drops-landing',
  templateUrl: './drops-landing.page.html',
  styleUrls: ['./drops-landing.page.scss'],
})
export class DropsLandingPage implements OnInit {

  constructor(
    private router: Router, 
    private dropManager: DropManagerService) { }

  ngOnInit() {
    this.loadDrops()
  }

  async loadDrops() {
    this.drops = await this.dropManager.getDrops()
  }
  navigateToDetails(drop: Drop) {
    this.router.navigate(['.', 'launches', 'details', drop.id.toString()])
  }

  drops: Drop[] = [
  ]
}
