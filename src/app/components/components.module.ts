import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { IonicModule } from '@ionic/angular';
import { PlanComponent } from './plan/plan.component';
import { NuevoPlanModalComponent } from './nuevo-plan-modal/nuevo-plan-modal.component';


import { FormsModule } from '@angular/forms';
import { MicrocicloComponent } from './microciclo/microciclo.component';
import { NuevoEntrenoComponent } from './nuevo-entreno/nuevo-entreno.component';
import { ParteEntrenamientoComponent } from './parte-entrenamiento/parte-entrenamiento.component';
import { CircuitoComponent } from './circuito/circuito.component';
import { EjerciciosSeleccionComponent } from './ejercicios-seleccion/ejercicios-seleccion.component';
import { PipesModule } from '../pipes/pipes.module';
import { EntrenamientoUserComponent } from './entrenamiento-user/entrenamiento-user.component';
import { CircuitoUserComponent } from './circuito-user/circuito-user.component';
import { MicrocicloRunningComponent } from './microciclo-running/microciclo-running.component';
import { EntrenamientosComponentsModule } from '../entrenamientos-components/entrenamientos-components.module';
import { EntrenamientoRunningComponent } from './entrenamiento-running/entrenamiento-running.component';
import { ClienteProfileComponent } from './cliente-profile/cliente-profile.component';
import { PlanesCardComponent } from './planes-card/planes-card.component';
import { PlanStatsCardComponent } from './plan-stats-card/plan-stats-card.component';


//Graficas

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MicrociclosCardDetailComponent } from './microciclos-card-detail/microciclos-card-detail.component';

import { NgCircleProgressModule  } from 'ng-circle-progress';
import { RunningPlanCreatorComponent } from './running-plan-creator/running-plan-creator.component';
import { RunningMicrocicloGraphComponent } from './running-microciclo-graph/running-microciclo-graph.component';
import { RunningEntrenosComponent } from './running-entrenos/running-entrenos.component';
import { RunningPlanComponent } from './running-plan/running-plan.component';
import { RunningFeedbackComponent } from './running-feedback/running-feedback.component';


@NgModule({
  declarations: [
    ClientesComponent,
    PlanComponent,
    NuevoPlanModalComponent,
    MicrocicloComponent,
    NuevoEntrenoComponent,
    ParteEntrenamientoComponent,
    CircuitoComponent,
    EjerciciosSeleccionComponent,
    EntrenamientoUserComponent,
    CircuitoUserComponent,
    MicrocicloRunningComponent,
    EntrenamientoRunningComponent,
    ClienteProfileComponent,
    PlanesCardComponent,
    PlanStatsCardComponent,
    MicrociclosCardDetailComponent,
    RunningPlanCreatorComponent,
    RunningMicrocicloGraphComponent,
    RunningEntrenosComponent,
    RunningPlanComponent,
    RunningFeedbackComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PipesModule,
    EntrenamientosComponentsModule,
    NgxChartsModule,
    NgCircleProgressModule.forRoot()
  ],
  exports: [
    ClientesComponent,
    PlanComponent,
    NuevoPlanModalComponent,
    MicrocicloComponent,
    ParteEntrenamientoComponent,
    EjerciciosSeleccionComponent,
    EntrenamientoUserComponent,
    CircuitoUserComponent,
    MicrocicloRunningComponent,
    ClienteProfileComponent,
    PlanesCardComponent,
    PlanStatsCardComponent,
    MicrociclosCardDetailComponent,
    RunningPlanCreatorComponent,
    RunningMicrocicloGraphComponent,
    RunningEntrenosComponent,
    RunningFeedbackComponent


  ],
})
export class ComponentsModule { }
