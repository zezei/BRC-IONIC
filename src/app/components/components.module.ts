import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';
import { IonicModule } from '@ionic/angular';
import { PlanComponent } from './plan/plan.component';
import { NuevoPlanModalComponent } from './nuevo-plan-modal/nuevo-plan-modal.component';


import { FormsModule } from '@angular/forms';
import { MicrocicloComponent } from './microciclo/microciclo.component';
import { NuevoEntrenoComponent } from './nuevo-entreno/nuevo-entreno.component';
import { EntrenamientoComponent } from './entrenamiento/entrenamiento.component';
import { ParteEntrenamientoComponent } from './parte-entrenamiento/parte-entrenamiento.component';

@NgModule({
  declarations: [
    ClientesComponent,
    PlanComponent,
    NuevoPlanModalComponent,
    MicrocicloComponent,
    NuevoEntrenoComponent,
    EntrenamientoComponent,
    ParteEntrenamientoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    ClientesComponent,
    PlanComponent,
    NuevoPlanModalComponent,
    MicrocicloComponent
  ],
})
export class ComponentsModule { }
