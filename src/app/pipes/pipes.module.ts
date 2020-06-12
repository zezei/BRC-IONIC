import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VigentesPipe } from './vigentes.pipe';



@NgModule({
  declarations: [
    VigentesPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VigentesPipe
  ]
})
export class PipesModule { }
