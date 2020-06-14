import { Component, OnInit, Input } from '@angular/core';
import { NuevoEntrenoComponent } from '../nuevo-entreno/nuevo-entreno.component';
import { PopoverController, ModalController, NavController } from '@ionic/angular';
import { EntrenamientoComponent } from '../entrenamiento/entrenamiento.component';
import { AdminService } from 'src/app/services/admin.service';
import { Microciclo, Entrenamiento } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-microciclo',
  templateUrl: './microciclo.component.html',
  styleUrls: ['./microciclo.component.scss'],
})
export class MicrocicloComponent implements OnInit {

  @Input() microciclo: Microciclo;
  @Input() clienteId;
  constructor(private popOverCtrl: PopoverController, private modalCtrl: ModalController, private adminService: AdminService, private navCtrl: NavController) { }

  ngOnInit() { }

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

  verEntreno(entreno: Entrenamiento) {
    this.navCtrl.navigateForward(`admin/tabs/tab1/cliente/${this.clienteId}/planes/${this.microciclo.plan_id}/microciclos/${this.microciclo.id}/entrenamiento/${entreno.id}`)

  }

}
