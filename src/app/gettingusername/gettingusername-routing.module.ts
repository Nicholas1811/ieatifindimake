import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GettingusernamePage } from './gettingusername.page';

const routes: Routes = [
  {
    path: '',
    component: GettingusernamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GettingusernamePageRoutingModule {}
