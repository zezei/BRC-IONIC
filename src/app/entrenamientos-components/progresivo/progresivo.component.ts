import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Progresivo, BloquePr } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';

@Component({
  selector: 'app-progresivo',
  templateUrl: './progresivo.component.html',
  styleUrls: ['./progresivo.component.scss'],
})
export class ProgresivoComponent implements OnInit {

  @Input() progresivo: Progresivo = {};
  @Output() actualizarVolumen: EventEmitter<Number> = new EventEmitter<Number>();

  constructor(public dataLocal: DataLocalService) { }

  ngOnInit() {}


  addBloque(){
    let bloque: BloquePr = {}
    this.progresivo.bloques.unshift(bloque)
  }

  removerBloque(index){
    this.progresivo.bloques.splice(index,1);
    this.sumar()
  }

  sumar(){
    this.progresivo.volTotal = 0;
    for (let i = 0; i < this.progresivo.bloques.length; i++) {
      const bloque = this.progresivo.bloques[i];
      this.progresivo.volTotal+= bloque.vol;
    }
    this.actualizarVolumen.emit(this.progresivo.volTotal)

  }
}
