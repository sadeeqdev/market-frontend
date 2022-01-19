import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DropManagerService } from 'src/app/contracts/drop-manager.service';
import { Drop } from '../../drop.model';

@Component({
  selector: 'app-drop-entry-chedda-xp',
  templateUrl: './drop-entry-chedda-xp.component.html',
  styleUrls: ['./drop-entry-chedda-xp.component.scss'],
})
export class DropEntryCheddaXpComponent implements OnInit {

  drop: Drop
  canEnter: boolean = true
  pending: boolean = false

  constructor(
    private modalController: ModalController,
    private dropManager: DropManagerService,
    ) { }

  ngOnInit() {}

  onCancelClicked() {
    this.modalController.dismiss()
  }

  async onSubmitClicked(){
    this.pending = true
    await this.dropManager.enterDrop(this.drop.contractAddress)
    this.modalController.dismiss()
    this.pending = false
  }

}
