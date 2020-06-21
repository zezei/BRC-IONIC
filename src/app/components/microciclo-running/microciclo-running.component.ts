import { Component, OnInit, Input } from '@angular/core';
import { Microciclo, Entrenamiento } from 'src/app/interfaces/interfaces';
import { NuevoEntrenoComponent } from '../nuevo-entreno/nuevo-entreno.component';
import { PopoverController, ModalController } from '@ionic/angular';
import { EntrenamientoRunningComponent } from '../entrenamiento-running/entrenamiento-running.component';

@Component({
  selector: 'app-microciclo-running',
  templateUrl: './microciclo-running.component.html',
  styleUrls: ['./microciclo-running.component.scss'],
})
export class MicrocicloRunningComponent implements OnInit {

  @Input() microciclo: Microciclo;
  @Input() clienteId;
  constructor(private popOverCtrl: PopoverController, private modalCtrl: ModalController) { }

  ngOnInit() {}

  async agregarNuevoEntreno() {
    const popOver = await this.popOverCtrl.create({
      component: NuevoEntrenoComponent,
      cssClass: 'pop-over',
      componentProps: {
        clienteId: this.clienteId,
        microciclo: this.microciclo
      }
    })


    await popOver.present();
  }

  async editar(entreno: Entrenamiento){
    const modal = await this.modalCtrl.create({
      component: EntrenamientoRunningComponent,
      componentProps: {
        entreno: entreno
      }
    })
    modal.present()

  }

  // getEC(entreno: Entrenamiento){
  //   return `${entreno.ejercicios_entrada_calor[0].running.volumen} ${entreno.ejercicios_entrada_calor[0].running.modo==="distancia" ? 'km': 'min'}`;
  // }

}
