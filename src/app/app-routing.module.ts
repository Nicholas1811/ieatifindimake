import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab1',
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },
  {
    path: 'recipedetails',
    loadChildren: () => import('./recipedetails/recipedetails.module').then( m => m.RecipedetailsPageModule)
  },
  {
    path: 'gettingusername',
    loadChildren: () => import('./gettingusername/gettingusername.module').then( m => m.GettingusernamePageModule)
  },
  {
    path: 'review',
    loadChildren: () => import('./review/review.module').then( m => m.ReviewPageModule)
  },
  {
    path: 'updatedeletereview',
    loadChildren: () => import('./updatedeletereview/updatedeletereview.module').then( m => m.UpdatedeletereviewPageModule)
  },
  {
    path: 'userupdate',
    loadChildren: () => import('./userupdate/userupdate.module').then( m => m.UserupdatePageModule)
  },
  {
    path: 'youtubevideo',
    loadChildren: () => import('./youtubevideo/youtubevideo.module').then( m => m.YoutubevideoPageModule)
  },
  {
    path: 'googlemap',
    loadChildren: () => import('./googlemap/googlemap.module').then( m => m.GooglemapPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
