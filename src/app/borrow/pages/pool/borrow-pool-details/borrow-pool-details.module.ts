import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BorrowPoolDetailsPageRoutingModule } from './borrow-pool-details-routing.module';

import { BorrowPoolDetailsPage } from './borrow-pool-details.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BorrowPoolDetailsPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [BorrowPoolDetailsPage]
})
export class BorrowPoolDetailsPageModule {}
