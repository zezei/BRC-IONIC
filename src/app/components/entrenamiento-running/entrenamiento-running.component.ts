import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Entrenamiento } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-entrenamiento-running',
  templateUrl: './entrenamiento-running.component.html',
  styleUrls: ['./entrenamiento-running.component.scss'],
})
export class EntrenamientoRunningComponent implements OnInit {

  @Input() entreno: Entrenamiento;
  actividadSeleccionada: string; 
  entradaCalor = {
    modo: '',
    volumen: '',
    observaciones: ''
  }
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }


}
