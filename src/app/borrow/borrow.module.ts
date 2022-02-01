import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BorrowPageRoutingModule } from './borrow-routing.module';

import { BorrowPage } from './borrow.page';
import { GetLoanModalComponent } from './components/get-loan-modal/get-loan-modal.component';
import { SharedComponentsModule } from '../components/shared-components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxDatatableModule,
    SharedComponentsModule,
    BorrowPageRoutingModule,
  ],
  declarations: [BorrowPage, GetLoanModalComponent]
})
export class BorrowPageModule {}
