import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main-navigation/main-navigation.module').then( m => m.MainNavigationPageModule)
  },
  {
    path: 'lend',
    loadChildren: () => import('./lend/lend.module').then( m => m.LendPageModule)
  },
  {
    path: 'borrow',
    loadChildren: () => import('./borrow/borrow.module').then( m => m.BorrowPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
