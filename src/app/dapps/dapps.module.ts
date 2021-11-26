import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DappsPageRoutingModule } from './dapps-routing.module';

import { DappsPage } from './dapps.page';
import { SharedComponentsModule } from '../components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    DappsPageRoutingModule
  ],
  declarations: [DappsPage]
})
export class DappsPageModule {}
