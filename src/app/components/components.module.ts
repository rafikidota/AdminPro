import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { BoosterComponent } from './booster/booster.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ImageModalComponent } from './image-modal/image-modal.component';



@NgModule({
  declarations: [
    BoosterComponent,
    DoughnutComponent,
    ImageModalComponent
  ],
  exports: [
    BoosterComponent,
    DoughnutComponent,
    ImageModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
