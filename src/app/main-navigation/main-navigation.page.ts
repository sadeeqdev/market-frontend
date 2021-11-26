import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WelcomeModalComponent } from '../components/welcome-modal/welcome-modal.component';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.page.html',
  styleUrls: ['./main-navigation.page.scss'],
})
export class MainNavigationPage implements OnInit, AfterViewInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    await this.presentWelcomeModal()
  }

  async presentWelcomeModal() {
    const modal = await this.modalController.create({
      component: WelcomeModalComponent,
      cssClass: 'myClass',
    })
    // return await modal.present()
  }

}
