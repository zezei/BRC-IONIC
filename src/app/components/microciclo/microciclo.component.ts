import { Component, OnInit, Input } from '@angular/core';
import { NuevoEntrenoComponent } from '../nuevo-entreno/nuevo-entreno.component';
import { PopoverController, ModalController } from '@ionic/angular';
import { EntrenamientoComponent } from '../entrenamiento/entrenamiento.component';

@Component({
  selector: 'app-microciclo',
  templateUrl: './microciclo.component.html',
  styleUrls: ['./microciclo.component.scss'],
})
export class MicrocicloComponent implements OnInit {

  @Input() microciclo;
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

  async verEntreno(entreno){
    const modal = await this.modalCtrl.create({
      component: EntrenamientoComponent,
      componentProps: {
        entreno: entreno
      }
    })
    modal.present()
    console.log(entreno)

  }

}
