import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { Entrenamiento, Microciclo, ContiunoVariable, ContinuoEstable, ActividadRunning, Fraccionado, Progresivo, Cliente, VolumenZona } from 'src/app/interfaces/interfaces';
import { AdminService } from 'src/app/services/admin.service';
import { DataLocalService } from 'src/app/services/data-local.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-entrenamiento-running',
  templateUrl: './entrenamiento-running.component.html',
  styleUrls: ['./entrenamiento-running.component.scss'],
})
export class EntrenamientoRunningComponent implements OnInit {

  @Input() entreno: Entrenamiento;
  @Input() microciclo: Microciclo;
  @Input() clienteId: string;
  actividadSeleccionada: string;
  entrenoPrincipal: any;

  actividades: any;
  actividadPrincipalOriginal: any;
  guardando: boolean = false;
  volumenPorZonas: VolumenZona = {
    '1-3': 0,
    '3-4': 0,
    '4-5': 0,
    '5-6': 0,
    '6-7': 0,
    '8-9': 0,
    '10': 0,
  };
  constructor(private modalCtrl: ModalController, private adminService: AdminService, public dataLocal: DataLocalService, private commonService: CommonService) { 

  }

  
  ngOnInit() {

    console.log(this.clienteId)
    console.log(this.entreno)
    if (this.entreno.actividadPrincipal){

      this.actividadPrincipalOriginal = this.entreno.actividadPrincipal.slice() || '';
    }
    this.entrenoPrincipal = {...this.entreno.parte_principal}
    if (this.entreno.medio){
      let medio = this.dataLocal.medios.find(medio => medio.nombre === this.entreno.medio) 
      this.actividades = medio.terrenos;

    }
    console.log(this.entrenoPrincipal)

  }

  async guardar() {
    console.log("Gurdando... ", this.entreno)
    this.guardando = true
    this.entreno.texto = this.getInfo(this.entreno)
    this.entreno.volPorZona = this.volumenPorZonas;
    const exito = await this.adminService.actualizarEntrenamiento(this.clienteId, this.microciclo.plan_id, this.microciclo.id, this.entreno.id, this.entreno)
    this.guardando = false;
    this.modalCtrl.dismiss(exito)
    console.log(exito);
  }

  cancelar(){
    this.entreno.actividadPrincipal = this.actividadPrincipalOriginal;
    this.entreno.parte_principal = this.entrenoPrincipal;
    this.modalCtrl.dismiss()
  }

  createActividad() {
    switch (this.entreno.actividadPrincipal) {
      case 'cv':
        let contiuno_variable: ContiunoVariable = {
          bloques: []
        }
        var entrada_en_calor = { contiuno_variable }
        this.entreno.parte_principal = entrada_en_calor
        break;
      case 'ce':
        let continuo_estable: ContinuoEstable = {}
        let ec: ActividadRunning = {};
        ec.contiuno_estable = continuo_estable;
        this.entreno.parte_principal = ec;
        break;
      case 'fr':
        let fraccionado: Fraccionado = {
          bloques: []
        }
        let ec_fr: ActividadRunning = {};
        ec_fr.fraccionado = fraccionado;
        this.entreno.parte_principal = ec_fr;
        break;
      case 'pr':
        let progresivo: Progresivo = {
          bloques: []
        }
        let ec_pr: ActividadRunning = {};
        ec_pr.progresivo = progresivo;
        this.entreno.parte_principal = ec_pr;
        break;
    }
  }
  actualizarEntrenoVol(event) {
    let tiempoEc = 0;
    let tiempoVc = 0;
    let distanciaEc = 0;
    let distanciaVC = 0;
    if (this.entreno.entrada_calor_running.volUnidad === 'distancia'){
      tiempoEc = this.dataLocal.getTiempo(this.entreno.entrada_calor_running.volumen, 0, this.entreno.entrada_calor_running.intensidad, this.commonService.cliente.nivel);
      distanciaEc = this.entreno.entrada_calor_running.volumen;
    }
    else{
       tiempoEc = this.entreno.entrada_calor_running.volumen;
       distanciaEc = this.dataLocal.getDistancia(this.entreno.entrada_calor_running.volumen, 0,this.entreno.entrada_calor_running.intensidad, this.commonService.cliente.nivel)
    }
    if (this.entreno.vuelta_a_calma_running.volUnidad === 'distancia'){
      tiempoVc = this.dataLocal.getTiempo(this.entreno.vuelta_a_calma_running.volumen, 0, this.entreno.vuelta_a_calma_running.intensidad, this.commonService.cliente.nivel);
      distanciaVC = this.entreno.vuelta_a_calma_running.volumen;
    }
    else{
      tiempoVc = this.entreno.vuelta_a_calma_running.volumen;
      distanciaVC = this.dataLocal.getDistancia(this.entreno.vuelta_a_calma_running.volumen, 0,this.entreno.vuelta_a_calma_running.intensidad, this.commonService.cliente.nivel)
    }
    this.volumenPorZonas = event.zonas;
    console.log("Zonas antes de ec y vc",this.volumenPorZonas)
    this.getVolumenPorZona(this.entreno.entrada_calor_running.intensidad, tiempoEc);
    this.getVolumenPorZona(this.entreno.vuelta_a_calma_running.intensidad, tiempoVc);

    console.log("Zonas pos de ec y vc",this.volumenPorZonas)


    this.entreno.volTotalEstimado = Number(event.tiempoEstimado) + tiempoEc + tiempoVc;
    this.entreno.distanciaTotalEstimada = Number(event.distanciaEstimada) + distanciaEc + distanciaVC;
    this.entreno.desnivelTotal = event.desnivel;
  }

  medioSeleccionado(){
    this.entreno.actividad = ''
    let medio = this.dataLocal.medios.find(medio => medio.nombre === this.entreno.medio) 
    this.actividades = medio.terrenos;
    console.log(this.actividades)
  }


  getInfo(entreno: Entrenamiento) {
    console.log(entreno.actividadPrincipal)
    switch (entreno.actividadPrincipal) {
      case 'cv':
        let cont_var = entreno.parte_principal.contiuno_variable;
        var bloques = ''
        if (cont_var.bloques.length === 1) {
          bloques = `Vol: ${cont_var.bloques[0].volTipo === "tiempo" ? new Date(cont_var.bloques[0].vol).getMinutes() + "'" : cont_var.bloques[0].vol + " km"} ${cont_var.bloques[0].volTipo === "tiempo"}' ${cont_var.bloques[0].intensidadA} x ${new Date(cont_var.bloques[0].volVarB).getMinutes()}' ${cont_var.bloques[0].intensidadB}\n`
          return bloques;
        }
        if (cont_var.bloques.length === 0) {
          return "Vacio"
        }
        for (let i = 0; i < cont_var.bloques.length; i++) {
          const bloque = cont_var.bloques[i];
          if (bloque.volUnidadA === "tiempo") {
            bloques += `Bloque ${i + 1}: Vol: ${bloque.volTipo === "tiempo" ? new Date(bloque.vol).getMinutes() + "'" : bloque.vol + " km"} ${bloque.volUnidadA === "tiempo"}' ${bloque.intensidadA} x ${new Date(bloque.volVarB).getMinutes()}' ${bloque.intensidadB}\n`
          }
          else {
            bloques += `Bloque ${i + 1}: Vol:${bloque.volTipo === "tiempo" ? new Date(bloque.vol).getMinutes() + "'" : bloque.vol + " km"}  ${bloque.volVarA}' ${bloque.intensidadA} x ${bloque.volVarB}' ${bloque.intensidadB}\n`

          }
        }
        return bloques;
      case 'ce':
        let cont_est = entreno.parte_principal.contiuno_estable;
        let texto = `${cont_est.terreno} Vol: ${cont_est.vol} ${cont_est.volUnidad === 'tiempo' ? "'" : "km"} (${cont_est.intensidad}). D+ ${cont_est.desnivel}`
        return texto;
      case 'fr':
        let fra = entreno.parte_principal.fraccionado;
        var bloques = ''
        if (fra.bloques.length === 1) {
          bloques = `${fra.bloques[0].series} Series de  ${fra.bloques[0].repeticiones}  x ${fra.bloques[0].volTipo === "tiempo" ? fra.bloques[0].vol + "'" : fra.bloques[0].vol + " km"}. Intensidad  ${fra.bloques[0].intensidad}\n`
          return bloques;
        }
        if (fra.bloques.length === 0) {
          return "Vacio"
        }
        for (let i = 0; i < fra.bloques.length; i++) {
          const bloque = fra.bloques[i];
          if (bloque.volTipo === "tiempo") {
            bloques += `Bloque ${i + 1}: ${bloque.series} Series de ${bloque.repeticiones} x${bloque.volTipo === "tiempo" ? bloque.vol + "'" : bloque.vol + " km"}. Intensidad  ${bloque.intensidad}\n`
          }
          else {
            bloques += `Bloque ${i + 1}: ${bloque.series} Series de ${bloque.repeticiones} x ${bloque.volTipo === "tiempo" ? bloque.vol + "'" : bloque.vol + " km"}. Intensidad  ${bloque.intensidad}\n`

          }
        }
        return bloques;

      case 'pr':
        let pro = entreno.parte_principal.progresivo;
        var bloques = ''
        if (pro.bloques.length === 1) {
          bloques = `${pro.series} Series de  ${pro.bloques[0].vol} . Intensidad  ${pro.bloques[0].intensidad}\n`
          return bloques;
        }
        if (pro.bloques.length === 0) {
          return "Vacio"
        }
        bloques = `${pro.series} Series de: \n`
        for (let i = 0; i < pro.bloques.length; i++) {
          const bloque = pro.bloques[i];
          if (pro.volTipo === "tiempo") {
            bloques += `${pro.volTipo === "tiempo" ? bloque.vol + "'" : bloque.vol + " km"}. Intensidad  ${bloque.intensidad}.\n`
          }
          else {
            bloques += `${pro.volTipo === "tiempo" ? bloque.vol + "'" : bloque.vol + " km"}. Intensidad  ${bloque.intensidad}.\n`

          }
        }
        return bloques;
      default:
        break;
    }
  }


  getVolumenPorZona(rpe: string, volumenTiempo){
    console.log(rpe)
    this.volumenPorZonas[rpe] += volumenTiempo;
  }
}
