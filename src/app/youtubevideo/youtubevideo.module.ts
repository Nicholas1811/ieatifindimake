import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YoutubevideoPageRoutingModule } from './youtubevideo-routing.module';

import { YoutubevideoPage } from './youtubevideo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YoutubevideoPageRoutingModule
  ],
  declarations: [YoutubevideoPage]
})
export class YoutubevideoPageModule {}
