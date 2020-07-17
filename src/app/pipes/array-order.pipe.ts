import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayOrder'
})
export class ArrayOrderPipe implements PipeTransform {
  
  transform(arreglo: any[], columna:string, columnaB?: string): any[] {
    let ordenados = []
    console.log(arreglo)
    if (columnaB){
      ordenados = arreglo.sort((a,b) => (a[columna][columnaB] > b[columna][columnaB]) ? 1 : ((b[columna][columnaB] > a[columna][columnaB]) ? -1 : 0));
    }
    else{
      ordenados = arreglo.sort((a,b) => (a[columna] > b[columna]) ? 1 : ((b[columna] > a[columna]) ? -1 : 0));
    }
    console.log("Los arreglo sin order son", arreglo)
    console.log("Los arreglo ordenados son ", ordenados)
    return ordenados;
  }

}
