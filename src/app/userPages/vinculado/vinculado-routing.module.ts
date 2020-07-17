import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VinculadoPage } from './vinculado.page';

const routes: Routes = [
  {
    path: '',
    component: VinculadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VinculadoPageRoutingModule {}
