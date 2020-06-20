import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VigentesPipe } from './vigentes.pipe';
import { BusquedaPipe } from './busqueda.pipe';
import { ArrayOrderPipe } from './array-order.pipe';
import { ArregloPorFechaPipe } from './arreglo-por-fecha.pipe';



@NgModule({
  declarations: [
    VigentesPipe,
    BusquedaPipe,
    ArrayOrderPipe,
    ArregloPorFechaPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VigentesPipe,
    BusquedaPipe,
    ArrayOrderPipe,
    ArregloPorFechaPipe
  ]
})
export class PipesModule { }
