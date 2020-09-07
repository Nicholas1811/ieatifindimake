import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserupdatePageRoutingModule } from './userupdate-routing.module';

import { UserupdatePage } from './userupdate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserupdatePageRoutingModule
  ],
  declarations: [UserupdatePage]
})
export class UserupdatePageModule {}
