import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ContiunoVariable, BloqueCV, VolumenZona } from 'src/app/interfaces/interfaces';
import { DataLocalService } from 'src/app/services/data-local.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-contiuno-variable',
  templateUrl: './contiuno-variable.component.html',
  styleUrls: ['./contiuno-variable.component.scss'],
})
export class ContiunoVariableComponent implements OnInit {


  @Input() contiunoVariable: ContiunoVariable = {};
  cantBloques: Number;
  @Output() actualizarVolumen: EventEmitter<any> = new EventEmitter<any>();
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
  }

  addBloque(){
    let nuevoBloque: BloqueCV = {}
    this.contiunoVariable.bloques.push(nuevoBloque)

  }

  removeBloque(index){
    this.contiunoVariable.bloques.splice(index, 1)
  }

  volumenTotalActualizado(){
    this.actualizarVolumen.emit(Number(this.contiunoVariable.volumenTotalEstimado));
  }
  actualizarVolTotal(){
    this.volumenPorZonas = {
      '1-3': 0,
      '3-4': 0,
      '4-5': 0,
      '5-6': 0,
      '6-7': 0,
      '8-9': 0,
      '10': 0,
    };
    this.contiunoVariable.volumenTotalEstimado = 0;
    let distanciaEstimada = 0;
    let desnivelTotal = 0;
    for (let i = 0; i < this.contiunoVariable.bloques.length; i++) {
      const bloque = this.contiunoVariable.bloques[i];
      if (bloque.volTipo === 'tiempo'){
        this.contiunoVariable.volumenTotalEstimado += bloque.vol;
        distanciaEstimada += this.dataLocal.getDistancia(bloque.vol, bloque.desnivel, bloque.intensidadA, this.commonService.cliente.nivel)

      }
      else{
        this.contiunoVariable.volumenTotalEstimado += this.dataLocal.getTiempo(bloque.vol, bloque.desnivel, bloque.intensidadA, this.commonService.cliente.nivel)/60
      }
      this.actualizarZonas(bloque);
      desnivelTotal += bloque.desnivel;
    }
    this.contiunoVariable.volumenTotalEstimado = Math.trunc(this.contiunoVariable.volumenTotalEstimado)
    let datos = {
      tiempoEstimado: this.contiunoVariable.volumenTotalEstimado,
      distanciaEstimada: distanciaEstimada,
      desnivel: desnivelTotal,
      zonas: this.volumenPorZonas,
    }
    this.actualizarVolumen.emit(datos);

  }

  actualizarDesnivelTotal(){
    this.contiunoVariable.desnivelTotal = 0;
    for (let i = 0; i < this.contiunoVariable.bloques.length; i++) {
      const bloque = this.contiunoVariable.bloques[i];
      this.contiunoVariable.desnivelTotal += bloque.desnivel;
    }
    this.actualizarVolTotal()
  }


  private actualizarZonas(bloque: BloqueCV){
    let ritmoClienteA = this.dataLocal.getRitmoCliente(bloque.intensidadA, this.commonService.cliente.nivel) //En segundos por km
    let ritmoClienteB = this.dataLocal.getRitmoCliente(bloque.intensidadB, this.commonService.cliente.nivel) //En segundos por km
    if (bloque.volTipo === 'distancia'){
      if (bloque.volUnidadA === "tiempo" && bloque.volUnidadB == "tiempo"){
        let distanciaRecorridaA = bloque.volVarA*60/ritmoClienteA
        let distanciaRecorridaB = bloque.volVarB*60/ritmoClienteB
        let distanciaRecorridaAB = distanciaRecorridaA + distanciaRecorridaB // Distancia que se recorrde por vuelta entre volA y volB
        let cantidadVueltas = bloque.vol / distanciaRecorridaAB;
        this.volumenPorZonas[bloque.intensidadA]+= bloque.volVarA * cantidadVueltas;
        this.volumenPorZonas[bloque.intensidadB]+= bloque.volVarB * cantidadVueltas;
      }
      if (bloque.volUnidadA === "distancia" && bloque.volUnidadB == "distancia"){
        let tiempoRecorridoAVuelta = bloque.volVarA*ritmoClienteA
        let tiempoRecorridoBVuelta = bloque.volVarB*ritmoClienteB
        let cantidadVueltas = bloque.vol / (bloque.volVarB + bloque.volVarA);
        this.volumenPorZonas[bloque.intensidadA]+= tiempoRecorridoAVuelta * cantidadVueltas/60;
        this.volumenPorZonas[bloque.intensidadB]+= tiempoRecorridoBVuelta * cantidadVueltas/60;

      }

    }

  }


}
