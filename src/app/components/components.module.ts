import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { BoosterComponent } from './booster/booster.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ImageModalComponent } from './image-modal/image-modal.component';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';



@NgModule({
  declarations: [
    BoosterComponent,
    DoughnutComponent,
    ImageModalComponent,
    EditUserModalComponent
  ],
  exports: [
    BoosterComponent,
    DoughnutComponent,
    ImageModalComponent,
    EditUserModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
