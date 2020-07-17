import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Entrenamiento, Microciclo } from 'src/app/interfaces/interfaces';
import { ModalController, Platform } from '@ionic/angular';
import { RunningFeedbackComponent } from '../running-feedback/running-feedback.component';
import { CommonService } from 'src/app/services/common.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { EntrenamientoRunningComponent } from '../entrenamiento-running/entrenamiento-running.component';

@Component({
  selector: 'app-running-entrenos',
  templateUrl: './running-entrenos.component.html',
  styleUrls: ['./running-entrenos.component.scss'],
})
export class RunningEntrenosComponent implements OnInit {


  @Input() entrenamientos: any[] = [];
  @Input() real: boolean;
  @Input() entrenamientosReales: any[] = [];
  @Input() microciclo: Microciclo;
  @Input() clienteId: string;
  volumenTotal = 0;
  desnivelTotal = 0;
  screenWidth: number = 0;
  @Output('entrenosActualizados') entrenosActualizados: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private modalCtrl: ModalController, private commonService: CommonService, private iab: InAppBrowser,public platform: Platform) { }

  ngOnInit() {
    this.screenWidth = this.platform.width()
    this.getVolumenTotal()
    console.log(this.clienteId)
    console.log(this.entrenamientosReales)

    // if (this.real){
    //   this.entrenamientos = await this.commonService.getStravaActivities('a','b')
    //   console.log(this.entrenamientos)
    //   // this.entrenamientos = this.entrenamientos.filter(entreno=> entreno.completo)
    // }
  }

  async editarEntrenoProgrmado(entreno: Entrenamiento){
      if (!entreno.entrada_calor_running) {
        entreno.entrada_calor_running = {}
      }
      if (!entreno.vuelta_a_calma_running) {
        entreno.vuelta_a_calma_running = {}
      }
      const modal = await this.modalCtrl.create({
        component: EntrenamientoRunningComponent,
        componentProps: {
          entreno: entreno,
          clienteId: this.clienteId,
          microciclo: this.microciclo,
        }
      })
      modal.present()
      const { data } = await modal.onDidDismiss();
      if (data){
        this.getVolumenTotal()
        this.entrenosActualizados.emit(true)
      }
      console.log(data)
      // if (data) {
      //   entreno.texto = this.getInfo(entreno);
      // }
  
  }


  getVolumenTotal(){
    this.volumenTotal = 0;
    if (!this.real){
      for (let i = 0; i < this.microciclo.entrenamientos.length; i++) {
        let entreno = this.microciclo.entrenamientos[i];
        if (entreno.volTotalEstimado){
          this.volumenTotal += Number(entreno.volTotalEstimado);

        }
        if (entreno.desnivelTotal){
          this.desnivelTotal += Number(entreno.desnivelTotal);

        }
      }
    }
    else {
      for (let i = 0; i < this.entrenamientosReales.length; i++) {
        const entreno = this.entrenamientosReales[i];
        this.volumenTotal += Number(entreno.elapsed_time /60);
        this.desnivelTotal += Number(entreno.total_elevation_gain)

      }
    
    }
  }
  editarEntrenoReal(entreno: Entrenamiento){
    
  }

  eliminar(entreno: Entrenamiento){

  }

  async marcarCompleto(entreno: Entrenamiento){
    const modal = await this.modalCtrl.create({
      component: RunningFeedbackComponent,
      componentProps: {
        entreno: entreno
      }

    })
    modal.present()
  }

  verActividad(id){
    const browser = this.iab.create(`https://www.strava.com/activities/${id}`,'_system');

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

}
