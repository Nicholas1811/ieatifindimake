import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatedeletereviewPageRoutingModule } from './updatedeletereview-routing.module';

import { UpdatedeletereviewPage } from './updatedeletereview.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatedeletereviewPageRoutingModule
  ],
  declarations: [UpdatedeletereviewPage]
})
export class UpdatedeletereviewPageModule {}
