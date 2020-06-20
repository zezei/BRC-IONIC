import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeamanaDetallePageRoutingModule } from './seamana-detalle-routing.module';

import { SeamanaDetallePage } from './seamana-detalle.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SeamanaDetallePageRoutingModule,
    PipesModule,
    ComponentsModule
  ],
  declarations: [SeamanaDetallePage]
})
export class SeamanaDetallePageModule {}
