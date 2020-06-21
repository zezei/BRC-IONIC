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
    EntrenamientoRunningComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PipesModule,
    EntrenamientosComponentsModule
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
    MicrocicloRunningComponent
  ],
})
export class ComponentsModule { }
