import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClientePageRoutingModule } from './cliente-routing.module';

import { ClientePage } from './cliente.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { NuevoPlanModalComponent } from 'src/app/components/nuevo-plan-modal/nuevo-plan-modal.component';
import { PipesModule } from 'src/app/pipes/pipes.module';

@NgModule({
  entryComponents:[
    NuevoPlanModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClientePageRoutingModule,
    ComponentsModule,
    PipesModule
  ],
  declarations: [ClientePage]
})
export class ClientePageModule {}
