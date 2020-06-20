import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SeamanaDetallePage } from './seamana-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: SeamanaDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeamanaDetallePageRoutingModule {}
