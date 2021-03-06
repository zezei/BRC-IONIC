import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule),

      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },

      {
        path: 'tab1/cliente/:id',
        loadChildren: () => import('../cliente/cliente.module').then(m => m.ClientePageModule),
      },
      {
        path: 'tab1/cliente/:clienteId/planes/:id',
        loadChildren: () => import('../plan/plan.module').then( m => m.PlanPageModule)
      },
      {
        path: 'tab1/cliente/:clienteId/planes/:planId/microciclos/:microId/entrenamiento/:entrenoId',
        loadChildren: () => import('../entrenamiento/entrenamiento.module').then( m => m.EntrenamientoPageModule)
      },
      {
        path: 'tab1/cliente/:clienteId/planesRunning/:id',
        loadChildren: () => import('../running-plan/running-plan.module').then( m => m.RunningPlanPageModule)
      },

      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
