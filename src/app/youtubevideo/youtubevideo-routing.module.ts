import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YoutubevideoPage } from './youtubevideo.page';

const routes: Routes = [
  {
    path: '',
    component: YoutubevideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YoutubevideoPageRoutingModule {}
