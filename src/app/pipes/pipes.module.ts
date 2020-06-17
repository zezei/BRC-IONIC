import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VigentesPipe } from './vigentes.pipe';
import { BusquedaPipe } from './busqueda.pipe';
import { ArrayOrderPipe } from './array-order.pipe';



@NgModule({
  declarations: [
    VigentesPipe,
    BusquedaPipe,
    ArrayOrderPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VigentesPipe,
    BusquedaPipe,
    ArrayOrderPipe
  ]
})
export class PipesModule { }
