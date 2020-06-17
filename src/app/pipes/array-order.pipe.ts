import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayOrder'
})
export class ArrayOrderPipe implements PipeTransform {
  
  transform(ejercicios: any[], columna:string, columnaB?: string): any[] {
    let ordenados = []
    if (columnaB){
      ordenados = ejercicios.sort((a,b) => (a[columna][columnaB] > b[columna][columnaB]) ? 1 : ((b[columna][columnaB] > a[columna][columnaB]) ? -1 : 0));
    }
    else{

      ordenados = ejercicios.sort((a,b) => (a[columna] > b[columna]) ? 1 : ((b[columna] > a[columna]) ? -1 : 0));
    }
    console.log("Los ejercicios sin order son", ejercicios)
    console.log("Los ejercicios ordenados son ", ordenados)
    return ordenados;
  }

}
