import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrls: ['./welcome-modal.component.scss'],
})
export class WelcomeModalComponent implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  onButtonClicked() {
    this.modalController.dismiss()
  }
}
