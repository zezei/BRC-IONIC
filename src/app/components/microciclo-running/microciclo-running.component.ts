import { Component, OnInit, Input } from '@angular/core';
import { Microciclo, Entrenamiento } from 'src/app/interfaces/interfaces';
import { NuevoEntrenoComponent } from '../nuevo-entreno/nuevo-entreno.component';
import { PopoverController, ModalController } from '@ionic/angular';
import { EntrenamientoRunningComponent } from '../entrenamiento-running/entrenamiento-running.component';
import { AdminService } from 'src/app/services/admin.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-microciclo-running',
  templateUrl: './microciclo-running.component.html',
  styleUrls: ['./microciclo-running.component.scss'],
})
export class MicrocicloRunningComponent implements OnInit {

  @Input() microciclo: Microciclo;
  @Input() clienteId;
  @Input() real: boolean = false;
  texto_pp: string = ''
  volumenTotal = 0;
  entrenamientos: any;
  entrenosRunning = {
    desnivelTotal: 0,
    volumenTotalTiempo: 0,
    volumenTotalDistancia: 0,

  }
  entrenosCiclismo = {
    desnivelTotal: 0,
    volumenTotalTiempo: 0,
    volumenTotalDistancia: 0,

  }
  entrenosOtros = {
    desnivelTotal: 0,
    volumenTotalTiempo: 0,
    volumenTotalDistancia: 0,

  }
  constructor(private popOverCtrl: PopoverController, private modalCtrl: ModalController, private adminService: AdminService, private commonService: CommonService) { }

  async ngOnInit() {
    if (this.real) {
      // let inicio = new Date(this.microciclo.fecha_inicio._seconds*1000)
      // let fin =
      this.entrenamientos = await this.commonService.getStravaActivities(this.microciclo.fecha_inicio._seconds, this.microciclo.fecha_fin._seconds)
      console.log(this.entrenamientos)

      this.getDatosReales();
      // this.entrenamientos = this.entrenamientos.filter(entreno=> entreno.completo)
    }
    else{
      this.getDatosProgrmados();

    }
  }

  showEntrenos() {
    this.microciclo.showEntrenos = !this.microciclo.showEntrenos;
  }


  getDatosProgrmados(){
    this.entrenosRunning = {
      desnivelTotal: 0,
      volumenTotalTiempo: 0,
      volumenTotalDistancia: 0,
  
    }
    this.entrenosCiclismo = {
      desnivelTotal: 0,
      volumenTotalTiempo: 0,
      volumenTotalDistancia: 0,
  
    }
    this.entrenosOtros = {
      desnivelTotal: 0,
      volumenTotalTiempo: 0,
      volumenTotalDistancia: 0,
  
    }
    for (let i = 0; i < this.microciclo.entrenamientos.length; i++) {
      let entreno = this.microciclo.entrenamientos[i];
      if (entreno.medio === 'Carrera'){
        this.entrenosRunning.volumenTotalTiempo += Number(entreno.volTotalEstimado);
        this.entrenosRunning.desnivelTotal += Number(entreno.desnivelTotal);
      }
      else if (entreno.medio === 'Ciclismo'){
        this.entrenosCiclismo.volumenTotalTiempo += Number(entreno.volTotalEstimado);
        this.entrenosCiclismo.desnivelTotal += Number(entreno.desnivelTotal);
      }
      else if (entreno.medio !== undefined){
        this.entrenosOtros.volumenTotalTiempo += Number(entreno.volTotalEstimado);
        this.entrenosOtros.desnivelTotal += Number(entreno.desnivelTotal);
      }
    }
  }

  getDatosReales(){
    for (let i = 0; i < this.entrenamientos.length; i++) {
      let entreno = this.entrenamientos[i];
      if (entreno.type === 'Run'){
        this.entrenosRunning.volumenTotalTiempo += Math.trunc(Number(entreno.elapsed_time/60));
        this.entrenosRunning.desnivelTotal += Math.trunc(Number(entreno.total_elevation_gain));
        this.entrenosRunning.volumenTotalDistancia += Math.trunc(Number(entreno.distance)/1000);
      }
      else if (entreno.type === 'Ride'){
        this.entrenosCiclismo.volumenTotalTiempo += Math.trunc(Number(entreno.elapsed_time/60));
        this.entrenosCiclismo.desnivelTotal += Math.trunc(Number(entreno.total_elevation_gain));
        this.entrenosCiclismo.volumenTotalDistancia += Math.trunc(Number(entreno.distance)/1000);

      }
      else{
        this.entrenosOtros.volumenTotalTiempo += Math.trunc(Number(entreno.elapsed_time/60));
        this.entrenosOtros.desnivelTotal += Math.trunc(Number(entreno.total_elevation_gain));
        this.entrenosOtros.volumenTotalDistancia += Math.trunc(Number(entreno.distance)/1000);
      }
    }
  }
}




  // async agregarNuevoEntreno() {
  //   const popOver = await this.popOverCtrl.create({
  //     component: NuevoEntrenoComponent,
  //     cssClass: 'pop-over',
  //     componentProps: {
  //       clienteId: this.clienteId,
  //       microciclo: this.microciclo,
  //     }
  //   })


  //   await popOver.present();
  // }

  // async editar(entreno: Entrenamiento) {
  //   if (!entreno.entrada_calor_running) {
  //     entreno.entrada_calor_running = {}
  //   }
  //   if (!entreno.vuelta_a_calma_running) {
  //     entreno.vuelta_a_calma_running = {}
  //   }
  //   const modal = await this.modalCtrl.create({
  //     component: EntrenamientoRunningComponent,
  //     componentProps: {
  //       entreno: entreno,
  //       clienteId: this.clienteId,
  //       microciclo: this.microciclo,
  //     }
  //   })
  //   modal.present()
  //   const { data } = await modal.onDidDismiss();
  //   if (data) {
  //     entreno.texto = this.getInfo(entreno);
  //     this.volumenTotal = 0;
  //     for (let i = 0; i < this.microciclo.entrenamientos.length; i++) {
  //       let entreno = this.microciclo.entrenamientos[i];
  //       console.log(entreno.volTotal)
  //       this.volumenTotal += Number(entreno.volTotal);
  //     }
  //   }

  // }

  // eliminar(entreno: Entrenamiento){

  // }


 


  // showEntrenos(entrenamientos:Entrenamiento[]){

  // }

  // async actualizarMicro() {
  //   await this.adminService.actualizarMicrociclo(this.microciclo, this.clienteId)
  // }
// }
