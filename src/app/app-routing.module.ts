import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('./adminPages/tabs/tabs.module').then(m => m.TabsPageModule),
    canLoad: [AdminGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./commonPages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: () => import('./userPages/tabs/tabs.module').then( m => m.TabsPageModule)
  },



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
