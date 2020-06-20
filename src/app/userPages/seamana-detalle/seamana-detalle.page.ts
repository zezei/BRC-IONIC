import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Microciclo } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-seamana-detalle',
  templateUrl: './seamana-detalle.page.html',
  styleUrls: ['./seamana-detalle.page.scss'],
})
export class SeamanaDetallePage implements OnInit {



  microciclo: Microciclo;
  diasSemana: Date[] = []
  fechaSeleccionada: Date;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.microciclo = this.userService.microcicloSeleccionado;
    let fechaInicio = new Date(this.microciclo.fecha_inicio._seconds*1000);
    let fechaFin = new Date(this.microciclo.fecha_fin._seconds*1000);
    console.log(fechaInicio)
    console.log(fechaFin)
    var fechaAuxA = new Date(fechaInicio);
    this.diasSemana.push(fechaAuxA)
    
    while (fechaInicio.getDate() < fechaFin.getDate()-1) {
      var fechaAux = new Date(fechaInicio.setDate(fechaInicio.getDate() + 1));
      this.diasSemana.push(fechaAux)
      console.log(fechaAux)
    }
    this.fechaSeleccionada = this.diasSemana[0]
    console.log(this.diasSemana)

  }

  segmentChanged(event){
    console.log(event.target.value)
  }

}
