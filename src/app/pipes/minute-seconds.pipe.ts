import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteSeconds'
})
export class MinuteSecondsPipe implements PipeTransform {

  transform(value: number): string {
    const horas: number = Math.floor(value / 60);
    const minutos = (value - horas * 60);
    if (minutos < 10){
      return horas + ':' + '0'+minutos;

    }
    else{
      return horas + ':' + minutos;
    }
 }

}
