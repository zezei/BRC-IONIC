import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Fraccionado, BloqueFR } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-fraccionado',
  templateUrl: './fraccionado.component.html',
  styleUrls: ['./fraccionado.component.scss'],
})
export class FraccionadoComponent implements OnInit {


  @Input() fraccionado: Fraccionado = {};
  cantBloques: number;
  suma: number = 0;
  fraccionadoOriginal: Fraccionado = {}
  @Output() actualizarVolumen: EventEmitter<Number> = new EventEmitter<Number>();

  constructor() { }

  ngOnInit() {
    if (this.fraccionado.bloques.length>=1){
      for (let i = 0; i < this.fraccionado.bloques.length; i++) {
        const bloque = this.fraccionado.bloques[i];
        this.suma += bloque.series*bloque.repeticiones*bloque.vol;
        
      }

    }
  }


  addBloque(){
    let nuevoBloque: BloqueFR = {}
    this.fraccionado.bloques.push(nuevoBloque)
  }

  removeBloque(index){
    this.fraccionado.bloques.splice(index,1)
  }

  sumar(){
    this.suma = 0;
     for (let i = 0; i < this.fraccionado.bloques.length; i++) {
       const bloque = this.fraccionado.bloques[i];
       this.suma+= bloque.vol*bloque.series*bloque.repeticiones;
     }
   this.actualizarVolumen.emit(this.suma)
  }
}
