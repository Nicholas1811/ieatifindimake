import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatedeletereviewPage } from './updatedeletereview.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatedeletereviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatedeletereviewPageRoutingModule {}
