import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { MainNavigationPageModule } from './main-navigation/main-navigation.module';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main-navigation/main-navigation.module').then( m => m.MainNavigationPageModule)
  },
  {
    path: 'governance',
    loadChildren: () => import('./governance/governance.module').then( m => m.GovernancePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
