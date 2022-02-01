import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MycollateralPageRoutingModule } from './mycollateral-routing.module';

import { MycollateralPage } from './mycollateral.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MycollateralPageRoutingModule
  ],
  declarations: [MycollateralPage]
})
export class MycollateralPageModule {}
