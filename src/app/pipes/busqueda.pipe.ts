import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'busqueda'
})
export class BusquedaPipe implements PipeTransform {

  transform(arreglo: any[], texto: string, columna: string): any {
    console.log("El texto es", texto)
    console.log("La columna a buscar es", columna)

    if (texto === '') {
      return arreglo;
    }
    texto = texto.toLowerCase()
    return arreglo.filter(item => {
      console.log(item)
      return item[columna].toLowerCase().includes(texto)
    })
  }

}
