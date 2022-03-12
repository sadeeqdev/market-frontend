import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DashboardLandingPageRoutingModule } from './dashboard-landing-routing.module';
import { DashboardLandingPage } from './dashboard-landing.page';
import { NgChartsModule } from 'ng2-charts'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgChartsModule,
    DashboardLandingPageRoutingModule
  ],
  declarations: [DashboardLandingPage]
})
export class DashboardLandingPageModule {}
