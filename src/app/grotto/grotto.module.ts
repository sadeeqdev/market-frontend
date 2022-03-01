import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrottoPageRoutingModule } from './grotto-routing.module';

import { GrottoPage } from './grotto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GrottoPageRoutingModule
  ],
  declarations: [GrottoPage]
})
export class GrottoPageModule {}
