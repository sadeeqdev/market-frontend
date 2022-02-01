import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LendPageRoutingModule } from './lend-routing.module';

import { LendPage } from './lend.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    LendPageRoutingModule
  ],
  declarations: [LendPage]
})
export class LendPageModule {}
