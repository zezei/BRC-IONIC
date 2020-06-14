import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VigentesPipe } from './vigentes.pipe';
import { BusquedaPipe } from './busqueda.pipe';



@NgModule({
  declarations: [
    VigentesPipe,
    BusquedaPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VigentesPipe,
    BusquedaPipe
  ]
})
export class PipesModule { }
