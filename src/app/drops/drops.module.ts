import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DropsPageRoutingModule } from './drops-routing.module';

import { DropsPage } from './drops.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropsPageRoutingModule
  ],
  declarations: [DropsPage]
})
export class DropsPageModule {}
