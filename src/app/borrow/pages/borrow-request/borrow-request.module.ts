import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BorrowRequestPageRoutingModule } from './borrow-request-routing.module';

import { BorrowRequestPage } from './borrow-request.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    BorrowRequestPageRoutingModule
  ],
  declarations: [BorrowRequestPage]
})
export class BorrowRequestPageModule {}
