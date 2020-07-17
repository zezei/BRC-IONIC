import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  ContinuoEstable, VolumenZona } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-contiuno-estable',
  templateUrl: './contiuno-estable.component.html',
  styleUrls: ['./contiuno-estable.component.scss'],
})
export class ContiunoEstableComponent implements OnInit {


  @Input() contiunoEstable: ContinuoEstable;
  @Output() actualizarVolumen: EventEmitter<any> = new EventEmitter<any>();
  @Input() nivelCliente: number;
  volumenPorZonas: VolumenZona = {
    '1-3': 0,
    '3-4': 0,
    '4-5': 0,
    '5-6': 0,
    '6-7': 0,
    '8-9': 0,
    '10': 0,
  };
  constructor(public dataLocal: DataLocalService, private commonService: CommonService) { }

  ngOnInit() {
    if (this.contiunoEstable.volUnidad === undefined){
      this.contiunoEstable.volUnidad = 'distancia'

    }
  }


  volumenActualizado(){
    console.log(this.contiunoEstable.vol)
    let distanciaEstimada = 0;
    if (this.contiunoEstable.volUnidad === 'tiempo'){
      this.contiunoEstable.volumenTotalEstimado = this.contiunoEstable.vol;
      console.log(this.contiunoEstable.volumenTotalEstimado)
      distanciaEstimada = this.dataLocal.getDistancia(this.contiunoEstable.vol, this.contiunoEstable.desnivel,this.contiunoEstable.intensidad, this.commonService.cliente.nivel)


    }
    else{
      this.contiunoEstable.volumenTotalEstimado = Math.trunc(this.dataLocal.getTiempo(this.contiunoEstable.vol, this.contiunoEstable.desnivel,this.contiunoEstable.intensidad, this.commonService.cliente.nivel)/60)
      console.log(this.contiunoEstable.volumenTotalEstimado)
    }
    this.actualizarZonas()
    let datos = {
      tiempoEstimado: this.contiunoEstable.volumenTotalEstimado,
      distanciaEstimada: distanciaEstimada,
      desnivel: this.contiunoEstable.desnivel,
      zonas: this.volumenPorZonas,
    }
    this.actualizarVolumen.emit(datos)
  }

  private actualizarZonas(){
    if (this.contiunoEstable.volUnidad === 'distancia'){
      this.volumenPorZonas[this.contiunoEstable.volUnidad] += this.dataLocal.getTiempo(this.contiunoEstable.vol, this.contiunoEstable.desnivel,this.contiunoEstable.intensidad, this.commonService.cliente.nivel)
    }
    else{
      this.volumenPorZonas[this.contiunoEstable.volUnidad] += this.contiunoEstable.vol;
    }
  }

}
