import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContiunoVariableComponent } from './contiuno-variable/contiuno-variable.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ContiunoVariableComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    ContiunoVariableComponent
  ]
})
export class EntrenamientosComponentsModule { }
