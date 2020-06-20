import { Pipe, PipeTransform } from '@angular/core';
import { Plan } from '../interfaces/interfaces';

@Pipe({
  name: 'vigentes',
  pure: false
})
export class VigentesPipe implements PipeTransform {

  transform(planes: Plan[], vigente: boolean=false): any {
    const today = new Date();
    let planesNuevos: Plan[] = [] 
    if (vigente){
      planes.filter(plan=> {
        if (new Date(plan.fecha_inicio._seconds*1000) < today && new Date(plan.fecha_vto._seconds*1000) > today){
          planesNuevos.push(plan)
        }}
        )
      }
      else{
        planes.filter(plan=> {
          if (new Date(plan.fecha_vto._seconds*1000) < today){
            planesNuevos.push(plan)
          }}
          )
        }
        return planesNuevos;
  }

}
