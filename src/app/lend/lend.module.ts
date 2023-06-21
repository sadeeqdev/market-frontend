import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LendPageRoutingModule } from './lend-routing.module';

import { LendPage } from './lend.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SharedComponentsModule } from '../components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxDatatableModule,
    LendPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [LendPage]
})
export class LendPageModule {}
