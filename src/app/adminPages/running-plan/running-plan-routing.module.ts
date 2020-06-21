import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RunningPlanPage } from './running-plan.page';

const routes: Routes = [
  {
    path: '',
    component: RunningPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RunningPlanPageRoutingModule {}
