import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HoyPageRoutingModule } from './hoy-routing.module';

import { HoyPage } from './hoy.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HoyPageRoutingModule,
    ComponentsModule
  ],
  declarations: [HoyPage]
})
export class HoyPageModule {}
