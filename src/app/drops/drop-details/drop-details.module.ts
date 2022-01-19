import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DropDetailsPageRoutingModule } from './drop-details-routing.module';

import { DropDetailsPage } from './drop-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DropDetailsPageRoutingModule
  ],
  declarations: [DropDetailsPage]
})
export class DropDetailsPageModule {}
