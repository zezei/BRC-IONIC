import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Circuito, Ejercicio } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { EjerciciosSeleccionComponent } from '../ejercicios-seleccion/ejercicios-seleccion.component';

@Component({
  selector: 'app-circuito',
  templateUrl: './circuito.component.html',
  styleUrls: ['./circuito.component.scss'],
})
export class CircuitoComponent implements OnInit {


  @Input() circuito: Circuito;
  @Output() actualizarCircuito: EventEmitter<Circuito> = new EventEmitter<Circuito>();
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.circuito)
    if (!this.circuito.ejercicios) {
      this.circuito.ejercicios = []
    }
  }

  async addEjercicio() {
    const modal = await this.modalCtrl.create({
      component: EjerciciosSeleccionComponent
    })
    await modal.present()

    const { data } = await modal.onDidDismiss()
    console.log(data)
    this.circuito.ejercicios.push(...data)

    // this.circuito.ejercicios.unshift(ejercicio)
  }

  guardarCircuito(){
    console.log("Por emitir evento desde circuito")
    this.actualizarCircuito.emit(this.circuito);
  }

}
