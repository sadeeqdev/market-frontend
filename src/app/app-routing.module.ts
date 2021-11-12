import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainNavigationPageModule } from './main-navigation/main-navigation.module';
import { MainNavigationPage } from './main-navigation/main-navigation.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: '',
    loadChildren: () => import('./main-navigation/main-navigation.module').then( m => m.MainNavigationPageModule)
  },
  {
    path: 'dapp-landing',
    loadChildren: () => import('./dapps/pages/dapp-landing/dapp-landing.module').then( m => m.DappLandingPageModule)
  },
  {
    path: 'dapp-category',
    loadChildren: () => import('./dapps/pages/dapp-category/dapp-category.module').then( m => m.DappCategoryPageModule)
  },
  {
    path: 'dapp-details',
    loadChildren: () => import('./dapps/pages/dapp-details/dapp-details.module').then( m => m.DappDetailsPageModule)
  },
  {
    path: 'dapps',
    loadChildren: () => import('./dapps/dapps.module').then( m => m.DappsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
