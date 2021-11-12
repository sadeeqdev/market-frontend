import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainNavigationPageRoutingModule } from './main-navigation-routing.module';

import { MainNavigationPage } from './main-navigation.page';
import { TopNavComponent } from './top-nav/top-nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainNavigationPageRoutingModule
  ],
  declarations: [MainNavigationPage, TopNavComponent]
})
export class MainNavigationPageModule {}
