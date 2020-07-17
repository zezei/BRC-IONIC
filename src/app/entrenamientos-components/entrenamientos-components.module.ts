import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContiunoVariableComponent } from './contiuno-variable/contiuno-variable.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ContiunoEstableComponent } from './contiuno-estable/contiuno-estable.component';
import { FraccionadoComponent } from './fraccionado/fraccionado.component';
import { ProgresivoComponent } from './progresivo/progresivo.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    ContiunoVariableComponent,
    ContiunoEstableComponent,
    FraccionadoComponent,
    ProgresivoComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    PipesModule
  ],
  exports: [
    ContiunoVariableComponent,
    ContiunoEstableComponent,
    FraccionadoComponent,
    ProgresivoComponent
  ]
})
export class EntrenamientosComponentsModule { }
