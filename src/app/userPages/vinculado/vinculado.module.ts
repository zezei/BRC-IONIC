import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VinculadoPageRoutingModule } from './vinculado-routing.module';

import { VinculadoPage } from './vinculado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VinculadoPageRoutingModule
  ],
  declarations: [VinculadoPage]
})
export class VinculadoPageModule {}
