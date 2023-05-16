import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BorrowLandingPageRoutingModule } from './borrow-landing-routing.module';

import { BorrowLandingPage } from './borrow-landing.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    NgxDatatableModule,
    BorrowLandingPageRoutingModule,
    SharedComponentsModule
  ],
  declarations: [BorrowLandingPage]
})
export class BorrowLandingPageModule {}
