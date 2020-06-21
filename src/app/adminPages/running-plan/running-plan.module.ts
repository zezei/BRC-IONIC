import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RunningPlanPageRoutingModule } from './running-plan-routing.module';

import { RunningPlanPage } from './running-plan.page';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { LOCALE_ID } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RunningPlanPageRoutingModule,
    PipesModule,
    ComponentsModule
  ],
  declarations: [RunningPlanPage],
  providers: [
    { provide: LOCALE_ID, useValue: "es-ES" }, //replace "en-US" with your locale
    //otherProviders...
  ]
})
export class RunningPlanPageModule {}
