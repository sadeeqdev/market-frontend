import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BorrowPoolDetailsPageRoutingModule } from './borrow-pool-details-routing.module';

import { BorrowPoolDetailsPage } from './borrow-pool-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BorrowPoolDetailsPageRoutingModule
  ],
  declarations: [BorrowPoolDetailsPage]
})
export class BorrowPoolDetailsPageModule {}
