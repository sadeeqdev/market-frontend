import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BorrowLoanPageRoutingModule } from './borrow-loan-routing.module';

import { BorrowLoanPage } from './borrow-loan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BorrowLoanPageRoutingModule
  ],
  declarations: [BorrowLoanPage]
})
export class BorrowLoanPageModule {}
