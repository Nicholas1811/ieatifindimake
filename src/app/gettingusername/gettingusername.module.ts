import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GettingusernamePageRoutingModule } from './gettingusername-routing.module';

import { GettingusernamePage } from './gettingusername.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GettingusernamePageRoutingModule
  ],
  declarations: [GettingusernamePage]
})
export class GettingusernamePageModule {}
