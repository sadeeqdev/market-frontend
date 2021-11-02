import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicRatingComponent } from './ionic-rating.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [IonicRatingComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [IonicRatingComponent]
})
export class IonicRatingModule { }
