import { Pipe, PipeTransform } from '@angular/core';
import { Entrenamiento } from '../interfaces/interfaces';

@Pipe({
  name: 'arregloPorFecha'
})
export class ArregloPorFechaPipe implements PipeTransform {

  transform(arreglo: Entrenamiento[], fecha: Date): Entrenamiento[] {
    return arreglo.filter(entreno=> new Date(entreno.fecha._seconds*1000).getDate()===fecha.getDate())
    
  }

}
