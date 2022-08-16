import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WelcomeModalComponent } from '../components/welcome-modal/welcome-modal.component';
import { PreferencesService } from '../shared/preferences.service';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.page.html',
  styleUrls: ['./main-navigation.page.scss'],
})
export class MainNavigationPage implements OnInit, AfterViewInit {

  constructor(
    private modalController: ModalController, 
    private preferences: PreferencesService) { }

  ngOnInit() {
  }

  async ngAfterViewInit() {
    // if (!this.preferences.welcomeModalShown) {
    //   await this.presentWelcomeModal()
    // }
  }

  async presentWelcomeModal() {
    const modal = await this.modalController.create({
      component: WelcomeModalComponent,
    })
    this.preferences.welcomeModalShown = true
    return await modal.present()
  }

}
