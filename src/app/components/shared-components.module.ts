import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DappReviewComponent } from './app-review/app-review.component';
import { IonicModule } from '@ionic/angular';
import { TruncateMiddlePipe } from '../pipes/truncate-middle.pipe';

@NgModule({
  declarations: [DappReviewComponent, TruncateMiddlePipe],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [DappReviewComponent, TruncateMiddlePipe]
})
export class SharedComponentsModule { }
