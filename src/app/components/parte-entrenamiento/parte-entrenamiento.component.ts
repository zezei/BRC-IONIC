import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EjerciciosCompletos, ParteEntreno } from 'src/app/interfaces/interfaces';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-parte-entrenamiento',
  templateUrl: './parte-entrenamiento.component.html',
  styleUrls: ['./parte-entrenamiento.component.scss'],
})
export class ParteEntrenamientoComponent implements OnInit {


  @Input() parte: ParteEntreno[];
  @Input() titulo: string;
  @Input() tipo_parte: string;
  ejerciciosCompletos: EjerciciosCompletos[];
  @Input() entrenoId;
  @Output() nuevaParte: EventEmitter<ParteEntreno[]> = new EventEmitter<ParteEntreno[]>();
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    console.log(this.parte)

  }

   crearCircuito(){
    //DEbe recibir dni, planid microid ebtrenoid
    let nuevoCircuito = {
      circuito: {}

    }
    this.parte.push(nuevoCircuito)
  }
  

  crearSerie(){
    let nuevaSerie: ParteEntreno = {
      serie: {}
    }
    this.parte.unshift(nuevaSerie)
  }


  guardar(event){

    console.log(event)
    console.log(this.parte)
    this.nuevaParte.emit(this.parte);
  }


}
